import decky
import asyncio
import csv
import json
import os
import glob
import subprocess
import pwd

ROUTE_FOLDER = os.path.join(decky.DECKY_USER_HOME, "EliteDeckRoute")
XCLIP = os.path.join(os.path.dirname(__file__), "xclip")


class Plugin:
    _route_stops: list = []   # [{"system": str, "bodies": [str, ...]}, ...]
    _current_index: int = 0
    _loaded_file: str = ""

    async def list_files(self) -> dict:
        try:
            os.makedirs(ROUTE_FOLDER, exist_ok=True)
            files = (
                glob.glob(os.path.join(ROUTE_FOLDER, "*.csv")) +
                glob.glob(os.path.join(ROUTE_FOLDER, "*.json"))
            )
            files.sort(key=os.path.getmtime, reverse=True)
            return {"success": True, "files": [os.path.basename(f) for f in files]}
        except Exception as e:
            return {"success": False, "files": [], "error": str(e)}

    async def load_from_folder(self, filename: str = "") -> dict:
        try:
            os.makedirs(ROUTE_FOLDER, exist_ok=True)

            files = (
                glob.glob(os.path.join(ROUTE_FOLDER, "*.csv")) +
                glob.glob(os.path.join(ROUTE_FOLDER, "*.json"))
            )

            if not files:
                return {"success": False, "error": f"No route file found in {ROUTE_FOLDER}"}

            if filename:
                target = os.path.join(ROUTE_FOLDER, filename)
                if not os.path.isfile(target):
                    return {"success": False, "error": f"File not found: {filename}"}
                newest = target
            else:
                newest = max(files, key=os.path.getmtime)
            stops: list = []

            if newest.endswith(".csv"):
                with open(newest, newline="", encoding="utf-8") as f:
                    reader = csv.DictReader(f)
                    rows = list(reader)

                if rows and "Body Name" in rows[0]:
                    # Road to Riches format — group bodies by system, no flags
                    for row in rows:
                        system = row.get("System Name", "").strip()
                        body = row.get("Body Name", "").strip()
                        if not system:
                            continue
                        if stops and stops[-1]["system"] == system:
                            stops[-1]["bodies"].append(body)
                        else:
                            stops.append({"system": system, "bodies": [body], "neutron": False, "refuel": False, "inject": False, "distance": 0.0})
                else:
                    # Travel route format — one system per row, with flags
                    for row in rows:
                        system = (
                            row.get("System Name") or
                            row.get("system") or
                            next(iter(row.values()), "")
                        )
                        system = system.strip() if system else ""
                        if system:
                            try:
                                distance = float(row.get("Distance", 0) or 0)
                            except ValueError:
                                distance = 0.0
                            stops.append({
                                "system": system,
                                "bodies": [],
                                "neutron": row.get("Neutron Star", "No").strip() == "Yes",
                                "refuel":  row.get("Refuel", "No").strip() == "Yes",
                                "inject":  row.get("Inject", "No").strip() == "Yes",
                                "distance": distance,
                            })

            elif newest.endswith(".json"):
                with open(newest, encoding="utf-8") as f:
                    data = json.load(f)
                result = data.get("result", data)
                if "system_jumps" in result:
                    jumps = result["system_jumps"]
                    stops = [{"system": j["system"], "bodies": [], "neutron": bool(j.get("neutron_star")), "refuel": bool(j.get("must_refuel")), "inject": bool(j.get("must_inject")), "distance": float(j.get("distance", 0) or 0)} for j in jumps]
                elif "jumps" in result:
                    jumps = result["jumps"]
                    stops = [{"system": j.get("name") or j.get("system", ""), "bodies": [], "neutron": bool(j.get("has_neutron")), "refuel": bool(j.get("must_refuel")), "inject": bool(j.get("must_inject")), "distance": float(j.get("distance", 0) or 0)} for j in jumps]

            stops = [s for s in stops if s["system"]]

            if not stops:
                return {"success": False, "error": "No systems found in file"}

            self._route_stops = stops
            self._current_index = 0
            self._loaded_file = os.path.basename(newest)
            decky.logger.info(f"Loaded {len(stops)} stops from {self._loaded_file}")
            return {"success": True, "total": len(stops), "filename": self._loaded_file}

        except Exception as e:
            decky.logger.error(f"load_from_folder: {e}")
            return {"success": False, "error": str(e)}

    async def get_state(self) -> dict:
        return {
            "stops": self._route_stops,
            "current_index": self._current_index,
            "total": len(self._route_stops),
            "loaded_file": self._loaded_file,
            "route_folder": ROUTE_FOLDER,
        }

    async def jump_to_system(self, name: str) -> dict:
        name = name.strip().lower()
        for i, stop in enumerate(self._route_stops):
            if stop["system"].lower() == name:
                self._current_index = i
                return {"success": True, "current_index": i}
        # Fallback: partial match
        for i, stop in enumerate(self._route_stops):
            if name in stop["system"].lower():
                self._current_index = i
                return {"success": True, "current_index": i}
        return {"success": False, "error": f"System not found: {name}"}

    async def advance(self) -> dict:
        if self._current_index < len(self._route_stops) - 1:
            self._current_index += 1
            return {"success": True, "current_index": self._current_index}
        return {"success": False, "current_index": self._current_index}

    async def go_back(self) -> dict:
        if self._current_index > 0:
            self._current_index -= 1
            return {"success": True, "current_index": self._current_index}
        return {"success": False, "current_index": self._current_index}

    async def copy_to_clipboard(self, text: str) -> dict:
        try:
            deck = pwd.getpwnam("deck")
            uid, gid = deck.pw_uid, deck.pw_gid

            env = {
                "DISPLAY": ":0",
                "XAUTHORITY": f"/run/user/{uid}/Xauthority",
                "HOME": deck.pw_dir,
            }

            def drop_privs():
                os.setgid(gid)
                os.setuid(uid)

            result = subprocess.run(
                [XCLIP, "-selection", "clipboard"],
                input=text.encode(),
                env=env,
                preexec_fn=drop_privs,
                capture_output=True,
                timeout=5
            )
            if result.returncode == 0:
                return {"success": True}
            error = result.stderr.decode().strip()
            decky.logger.error(f"xclip failed: {error}")
            return {"success": False, "error": error or "xclip failed"}
        except Exception as e:
            decky.logger.error(f"copy_to_clipboard: {e}")
            return {"success": False, "error": str(e)}

    async def clear_route(self):
        self._route_stops = []
        self._current_index = 0
        self._loaded_file = ""

    async def _main(self):
        os.makedirs(ROUTE_FOLDER, exist_ok=True)
        decky.logger.info(f"Elite Deck Route ready — watching {ROUTE_FOLDER}")

    async def _unload(self):
        decky.logger.info("Elite Deck Route unloaded")

    async def _uninstall(self):
        pass

    async def _migration(self):
        pass
