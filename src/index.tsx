import {
  ButtonItem,
  PanelSection,
  PanelSectionRow,
  TextField,
  ToggleField,
  staticClasses,
} from "@decky/ui";
import { callable, definePlugin, toaster } from "@decky/api";
import { useState, useEffect } from "react";
import { FaShip } from "react-icons/fa";

type Stop = { system: string; bodies: string[]; neutron: boolean; refuel: boolean; inject: boolean; distance: number; scan_value: number; mapping_value: number };

const loadFromFolder = callable<[filename: string], { success: boolean; total: number; filename?: string; error?: string }>("load_from_folder");
const listFiles = callable<[], { success: boolean; files: string[] }>("list_files");
const getState = callable<[], { stops: Stop[]; current_index: number; total: number; loaded_file: string; route_folder: string }>("get_state");
const advance = callable<[], { success: boolean; current_index: number }>("advance");
const goBack = callable<[], { success: boolean; current_index: number }>("go_back");
const copyToClipboard = callable<[text: string], { success: boolean; error?: string }>("copy_to_clipboard");
const clearRoute = callable<[], void>("clear_route");
const jumpToSystem = callable<[name: string], { success: boolean; current_index?: number; error?: string }>("jump_to_system");
const getRouteFolder = callable<[], string>("get_route_folder");
const saveFolderPath = callable<[path: string], { success: boolean; error?: string }>("set_route_folder");

function Content() {
  const [stops, setStops] = useState<Stop[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedFile, setLoadedFile] = useState("");
  const [routeFolder, setRouteFolder] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [availableFiles, setAvailableFiles] = useState<string[]>([]);
  const [showPicker, setShowPicker] = useState(false);
  const [showFinder, setShowFinder] = useState(false);
  const [findQuery, setFindQuery] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [folderInput, setFolderInput] = useState("");

  useEffect(() => {
    getState().then((state) => {
      setRouteFolder(state.route_folder);
      if (state.stops.length > 0) {
        setStops(state.stops);
        setCurrentIndex(state.current_index);
        setLoadedFile(state.loaded_file);
      } else {
        handleLoad("", true);
      }
    });
  }, []);

  const refreshFileList = async () => {
    const result = await listFiles();
    setAvailableFiles(result.files ?? []);
    return result.files ?? [];
  };

  const handleLoad = async (filename = "", silent = false) => {
    setLoading(true);
    setError("");
    const result = await loadFromFolder(filename);
    setLoading(false);
    if (result.success) {
      const state = await getState();
      setStops(state.stops);
      setCurrentIndex(0);
      setLoadedFile(result.filename ?? "");
      setShowPicker(false);
      if (!silent) {
        toaster.toast({ title: "Route loaded", body: `${result.total} systems from ${result.filename}` });
      }
    } else {
      setError(result.error ?? "Unknown error");
    }
  };

  const handleShowPicker = async () => {
    await refreshFileList();
    setShowPicker(true);
  };

  const handleShowOptions = async () => {
    const folder = await getRouteFolder();
    setFolderInput(folder);
    setShowOptions(true);
  };

  const handleSaveFolder = async () => {
    if (!folderInput.trim()) return;
    const result = await saveFolderPath(folderInput.trim());
    if (result.success) {
      setRouteFolder(folderInput.trim());
      toaster.toast({ title: "Folder saved", body: folderInput.trim() });
    } else {
      toaster.toast({ title: "Invalid path", body: result.error ?? "Could not create folder" });
    }
  };

  const handleFind = async () => {
    if (!findQuery.trim()) return;
    const result = await jumpToSystem(findQuery.trim());
    if (result.success) {
      setCurrentIndex(result.current_index!);
      setShowFinder(false);
      setFindQuery("");
    } else {
      toaster.toast({ title: "Not found", body: result.error ?? "System not found" });
    }
  };

  const handleCopy = async () => {
    const system = stops[currentIndex]?.system;
    if (!system) return;
    const result = await copyToClipboard(system);
    if (result.success) {
      toaster.toast({ title: "Copied!", body: system });
      if (autoAdvance) await handleNext();
    } else {
      toaster.toast({ title: "Copy failed", body: result.error ?? "Unknown error" });
    }
  };

  const handleNext = async () => {
    const result = await advance();
    setCurrentIndex(result.current_index);
    if (!result.success) {
      toaster.toast({ title: "Route complete!", body: "You've reached the destination" });
    }
  };

  const handleBack = async () => {
    const result = await goBack();
    setCurrentIndex(result.current_index);
  };

  const handleClear = async () => {
    await clearRoute();
    setStops([]);
    setCurrentIndex(0);
    setLoadedFile("");
    setError("");
  };

  const currentStop = stops[currentIndex];
  const nextStop = stops[currentIndex + 1];
  const hasRoute = stops.length > 0;
  const isLast = currentIndex >= stops.length - 1;
  const hasBodies = currentStop?.bodies?.length > 0;
  const hasFlags = currentStop?.neutron || currentStop?.refuel || currentStop?.inject;

  const isRiches = stops.some(s => s.scan_value > 0 || s.mapping_value > 0);
  const earnedScan    = stops.slice(0, currentIndex).reduce((a, s) => a + (s.scan_value ?? 0), 0);
  const earnedMapping = stops.slice(0, currentIndex).reduce((a, s) => a + (s.mapping_value ?? 0), 0);
  const totalScan     = stops.reduce((a, s) => a + (s.scan_value ?? 0), 0);
  const totalMapping  = stops.reduce((a, s) => a + (s.mapping_value ?? 0), 0);
  const fmt = (n: number) => n.toLocaleString() + " cr";

  if (showOptions) {
    return (
      <PanelSection>
        <PanelSectionRow>
          <ToggleField
            label="Auto-advance on copy"
            description="Automatically move to the next system after copying"
            checked={autoAdvance}
            onChange={setAutoAdvance}
          />
        </PanelSectionRow>
        <PanelSectionRow>
          <TextField
            label="Routes folder"
            value={folderInput}
            onChange={(e) => setFolderInput(e.target.value)}
          />
        </PanelSectionRow>
        <PanelSectionRow>
          <ButtonItem layout="below" onClick={handleSaveFolder}>
            Save Folder
          </ButtonItem>
        </PanelSectionRow>
        <PanelSectionRow>
          <ButtonItem layout="below" onClick={() => setShowOptions(false)}>
            Back
          </ButtonItem>
        </PanelSectionRow>
      </PanelSection>
    );
  }

  if (showFinder) {
    return (
      <PanelSection>
        <PanelSectionRow>
          <TextField
            label="System name"
            value={findQuery}
            onChange={(e) => setFindQuery(e.target.value)}
          />
        </PanelSectionRow>
        <PanelSectionRow>
          <ButtonItem layout="below" onClick={handleFind}>
            Go to System
          </ButtonItem>
        </PanelSectionRow>
        <PanelSectionRow>
          <ButtonItem layout="below" onClick={() => { setShowFinder(false); setFindQuery(""); }}>
            Cancel
          </ButtonItem>
        </PanelSectionRow>
      </PanelSection>
    );
  }

  if (showPicker) {
    return (
      <PanelSection>
        <PanelSectionRow>
          <div style={{ color: "#8b9bb4", fontSize: "11px" }}>Select a route file:</div>
        </PanelSectionRow>
        {availableFiles.length === 0 && (
          <PanelSectionRow>
            <div style={{ color: "#ff6b6b", fontSize: "12px" }}>No files found in folder</div>
          </PanelSectionRow>
        )}
        {availableFiles.map((f) => (
          <PanelSectionRow key={f}>
            <ButtonItem layout="below" onClick={() => handleLoad(f)}>
              {f}
            </ButtonItem>
          </PanelSectionRow>
        ))}
        <PanelSectionRow>
          <ButtonItem layout="below" onClick={() => setShowPicker(false)}>
            Cancel
          </ButtonItem>
        </PanelSectionRow>
      </PanelSection>
    );
  }

  return (
    <PanelSection>
      {hasRoute && (
        <>
          <PanelSectionRow>
            <div>
              <div style={{ color: "#8b9bb4", fontSize: "11px" }}>{loadedFile}</div>
              <div style={{ color: "#5a6a80", fontSize: "10px", marginTop: "2px", letterSpacing: "0.05em" }}>
                STOP {currentIndex + 1} OF {stops.length}
              </div>
            </div>
          </PanelSectionRow>

          <PanelSectionRow>
            <div style={{ color: "#ffffff", fontSize: "15px", fontWeight: "bold", wordBreak: "break-word" }}>
              {currentStop?.system}
            </div>
          </PanelSectionRow>

          {hasFlags && (
            <PanelSectionRow>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {currentStop.neutron && (
                  <span style={{ background: "#4a90d9", color: "#fff", fontSize: "11px", padding: "2px 7px", borderRadius: "3px" }}>
                    Neutron boost
                  </span>
                )}
                {currentStop.refuel && (
                  <span style={{ background: "#c8a84b", color: "#000", fontSize: "11px", padding: "2px 7px", borderRadius: "3px" }}>
                    Refuel
                  </span>
                )}
                {currentStop.inject && (
                  <span style={{ background: "#5cb85c", color: "#fff", fontSize: "11px", padding: "2px 7px", borderRadius: "3px" }}>
                    Inject
                  </span>
                )}
              </div>
            </PanelSectionRow>
          )}

          {hasBodies && (
            <PanelSectionRow>
              <div style={{ color: "#c8a84b", fontSize: "12px", lineHeight: "1.6" }}>
                {currentStop.bodies.map((b, i) => (
                  <div key={i}>· {b}</div>
                ))}
              </div>
            </PanelSectionRow>
          )}

          {isRiches && (
            <PanelSectionRow>
              <div style={{ fontSize: "11px", lineHeight: "1.7" }}>
                <div style={{ color: "#8b9bb4" }}>
                  Scan: <span style={{ color: "#e8e8e8" }}>{fmt(earnedScan)}</span>
                  <span style={{ color: "#5a6a80" }}> / {fmt(totalScan)}</span>
                </div>
                <div style={{ color: "#8b9bb4" }}>
                  Map: <span style={{ color: "#e8e8e8" }}>{fmt(earnedMapping)}</span>
                  <span style={{ color: "#5a6a80" }}> / {fmt(totalMapping)}</span>
                </div>
              </div>
            </PanelSectionRow>
          )}

          {nextStop && (
            <PanelSectionRow>
              <div style={{ color: "#8b9bb4", fontSize: "12px" }}>
                Next: {nextStop.system}
                {nextStop.distance > 0 && ` · ${nextStop.distance.toFixed(1)} ly`}
              </div>
            </PanelSectionRow>
          )}

          <PanelSectionRow>
            <ButtonItem layout="below" onClick={handleCopy}>
              Copy System Name
            </ButtonItem>
          </PanelSectionRow>

          <PanelSectionRow>
            <ButtonItem layout="below" onClick={handleNext}>
              {isLast ? "Route Complete" : "Done — Next System"}
            </ButtonItem>
          </PanelSectionRow>

          <PanelSectionRow>
            <ButtonItem layout="below" onClick={handleBack}>
              Previous System
            </ButtonItem>
          </PanelSectionRow>

          <PanelSectionRow>
            <ButtonItem layout="below" onClick={() => setShowFinder(true)}>
              Find System
            </ButtonItem>
          </PanelSectionRow>

          <PanelSectionRow>
            <ButtonItem layout="below" onClick={handleShowPicker}>
              Switch Route
            </ButtonItem>
          </PanelSectionRow>

          <PanelSectionRow>
            <ButtonItem layout="below" onClick={handleClear}>
              Clear Route
            </ButtonItem>
          </PanelSectionRow>

          <PanelSectionRow>
            <ButtonItem layout="below" onClick={handleShowOptions}>
              Options
            </ButtonItem>
          </PanelSectionRow>
        </>
      )}

      {!hasRoute && (
        <>
          {error ? (
            <PanelSectionRow>
              <div style={{ color: "#ff6b6b", fontSize: "12px", wordBreak: "break-word" }}>
                {error}
              </div>
            </PanelSectionRow>
          ) : null}

          <PanelSectionRow>
            <div style={{ color: "#8b9bb4", fontSize: "11px", wordBreak: "break-word" }}>
              Drop a Spansh CSV into:{"\n"}{routeFolder}
            </div>
          </PanelSectionRow>

          <PanelSectionRow>
            <ButtonItem layout="below" onClick={handleShowPicker}>
              {loading ? "Loading..." : "Load Route"}
            </ButtonItem>
          </PanelSectionRow>
          <PanelSectionRow>
            <ButtonItem layout="below" onClick={handleShowOptions}>
              Options
            </ButtonItem>
          </PanelSectionRow>
        </>
      )}
    </PanelSection>
  );
}

export default definePlugin(() => {
  return {
    name: "Elite Decky Routes",
    titleView: <div className={staticClasses.Title}>Elite Decky Routes</div>,
    content: <Content />,
    icon: <FaShip />,
    onDismount() {},
  };
});
