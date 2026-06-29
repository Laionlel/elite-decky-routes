# Elite Decky Routes

A [Decky Loader](https://github.com/SteamDeckHomebrew/decky-loader) plugin for [Elite Dangerous](https://www.elitedangerous.com/) on Steam Deck.

Navigate routes planned on [Spansh](https://spansh.co.uk) without typing system names manually. Import a route file, copy the next system to your clipboard, and paste it straight into the Galaxy Map.

## Features

- Supports **travel routes** and **Road to Riches** routes exported from Spansh (CSV and JSON)
- One-tap copy of the current system name to clipboard — paste directly into the Galaxy Map
- Shows **neutron boost**, **refuel**, and **FSD injection** flags per system
- Displays next system name and jump distance in light years
- Switch between multiple route files stored in the same folder
- **Find System** — jump to any position in a long route by typing a system name
- Optional auto-advance on copy

## How it works

The plugin reads route files from a specific folder on your Steam Deck:

```
/home/deck/EliteDeckRoute/
```

This folder is created automatically when the plugin first loads. You need to get your Spansh route files into this folder — the recommended way is SyncThing, but you can also use a USB drive.

## Setup

### Step 1 — Export a route from Spansh

1. Go to [spansh.co.uk](https://spansh.co.uk) and plan your route (Exact Plotter or Road to Riches)
2. When the route is ready, download it as a **CSV** or **JSON** file

> **Note:** FSD injection data is only available in JSON exports, not CSV.

---

### Step 2 — Get the file onto your Steam Deck

Choose one of the following methods:

#### Option A — SyncThing (recommended for regular use)

SyncThing automatically syncs a folder between your PC/Mac and your Steam Deck over your home network. Once set up, you just drop a file in a folder on your computer and it appears on the Deck within seconds.

**On your PC or Mac:**

1. Download and install SyncThing from [syncthing.net](https://syncthing.net)
2. Open SyncThing in your browser (it opens automatically, usually at `http://127.0.0.1:8384`)
3. Click **Add Folder**
4. Set the folder path to wherever you want to store your route files (e.g. `~/Documents/EliteDeckRoute`)
5. Note down your **Device ID** — you'll need it for the Deck (it's shown under **Actions → Show ID**)

**On your Steam Deck:**

1. Switch to **Desktop Mode** (Steam button → Power → Switch to Desktop)
2. Open a terminal (Konsole)
3. Install SyncThing:
   ```
   curl -s https://installsyncthing.app | sh
   ```
   Or download it from [syncthing.net/downloads](https://syncthing.net/downloads/) and run it manually.
4. Open a browser on the Deck and go to `http://127.0.0.1:8384` to open SyncThing
5. Click **Add Remote Device** and paste your PC/Mac's Device ID
6. Accept the connection on your PC/Mac when prompted
7. Click **Add Folder** on the Deck, set the folder path to:
   ```
   /home/deck/EliteDeckRoute
   ```
8. Under the **Sharing** tab, share it with your PC/Mac device
9. Accept the folder share on your PC/Mac

From now on, any file you drop into the folder on your PC/Mac will automatically appear on the Deck.

#### Option B — USB drive

1. Copy your route file to a USB drive
2. Plug it into your Steam Deck
3. Switch to Desktop Mode (Steam button → Power → Switch to Desktop)
4. Open the file manager and copy the route file to `/home/deck/EliteDeckRoute/`

---

### Step 3 — Load the route in-game

1. Launch Elite Dangerous
2. Press the **Steam button** to open the Decky menu
3. Open **Elite Decky Routes** — it will automatically load the newest file in the folder
4. If you have multiple files, tap **Switch Route** to choose one

---

## Usage

1. Open the Galaxy Map in-game and tap the search field
2. Open the Decky menu → **Elite Decky Routes**
3. Tap **Copy System Name**
4. Close the Decky menu and paste into the Galaxy Map search field (press **Y** or use the on-screen keyboard)
5. Plot the route and jump
6. Tap **Done — Next System** to advance to the next jump (or enable **Auto-advance on copy** in Options)

---

## License

BSD 3-Clause License — see [LICENSE](LICENSE)
