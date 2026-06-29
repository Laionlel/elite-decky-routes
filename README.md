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

## Setup

### 1. Install SyncThing (recommended)

The easiest way to get route files onto your Steam Deck is [SyncThing](https://syncthing.net/). Set up a shared folder between your PC/Mac and your Steam Deck pointing to:

```
/home/deck/EliteDeckRoute/
```

### 2. Export a route from Spansh

1. Go to [spansh.co.uk](https://spansh.co.uk) and plan your route
2. Download the result as a **CSV** or **JSON** file
3. Drop it into your synced folder

> **Note:** FSD injection data is only included in JSON exports, not CSV.

### 3. Load the route

Open the plugin from the Decky menu, and it will automatically load the newest file in the folder. Use **Switch Route** to pick a different file.

## Supported route types

| Route type | CSV | JSON |
|---|---|---|
| Exact Plotter (travel) | ✅ | ✅ |
| Road to Riches | ✅ | — |

## Usage

1. Plot your route in the Galaxy Map (open Galaxy Map → Search)
2. Open the plugin, tap **Copy System Name**
3. Close the plugin, tap the Galaxy Map search field, paste (Steam Deck: hold the right trackpad to bring up keyboard, or use controller shortcut)
4. Press **Done — Next System** to advance (or enable auto-advance in Options)

## License

MIT License — see [LICENSE](LICENSE)
