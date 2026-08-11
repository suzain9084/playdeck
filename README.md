# PlayDeck

**Phones + Screen = Console**

PlayDeck is a browser-based party gaming platform. Open it on a TV, laptop, or any big screen, then connect phones as wireless controllers — no app downloads, no accounts, no installs. Players join with a short room code or QR scan and play together in real time.

---

## Table of Contents

- [Overview](#overview)
- [How It Works](#how-it-works)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Running Locally](#running-locally)
- [User Flow](#user-flow)
- [WebSocket & Room System](#websocket--room-system)
- [Adding a New Game](#adding-a-new-game)
- [Deployment](#deployment)
- [Environment & URLs](#environment--urls)

---

## Overview

PlayDeck turns any web browser into a shared gaming console:

| Role | Device | What it does |
|------|--------|--------------|
| **Screen** | Desktop / TV / laptop | Displays the game, shows a room code & QR code, runs the game canvas |
| **Controller** | Mobile phone | Acts as a gamepad — navigate the library or send in-game inputs |

The **host** (the first phone that joins) controls game selection using a virtual D-pad. Additional players connect as controllers and receive game-specific UIs when a game starts.

Currently, **Snake Grid** is fully playable. The game library UI lists many titles (Kart Racing, Quiz Mania, etc.) as placeholders for future games.

---

## How It Works

```
┌─────────────────┐         WebSocket          ┌─────────────────┐
│   Big Screen    │◄──────────────────────────►│  FastAPI Server │
│  (PlayGame.tsx) │         /ws/{room}/{name}   │  Room Manager   │
└────────┬────────┘                             └────────▲────────┘
         │                                               │
         │  Room code + QR                               │
         ▼                                               │
┌─────────────────┐         WebSocket                    │
│  Phone #1       │──────────────────────────────────────┘
│  (Host remote)  │
└─────────────────┘
         ▲
         │  Scan QR or enter code
┌─────────────────┐
│  Phone #2, #3…  │
│  (Controllers)  │
└─────────────────┘
```

1. The **screen** opens `/playgames` and receives a unique 8-character room ID from the backend.
2. A **QR code** and room code are shown so phones can join at `/playgames?roomid=<code>`.
3. Each **phone** enters a display name and the room code, then connects over WebSocket.
4. Once players are connected, the **host** navigates the game library (up/down/left/right + select).
5. When a game is selected, the screen loads the game view and each phone loads that game's controller UI.
6. Input events travel through the WebSocket server and are relayed to all room members.

---

## Architecture

PlayDeck is a **monorepo** with two main parts:

```
playDeck/
├── backend/          # FastAPI + WebSocket server
│   ├── main.py       # App entry, CORS, route registration
│   ├── routes/
│   │   ├── route.py  # REST: GET /get_room_id
│   │   └── socket.py # WebSocket: /ws/{room_id}/{name}
│   └── services/
│       └── room_manager.py  # Room lifecycle, member tracking, broadcast
│
└── frontend/         # React SPA (Vite)
    └── src/
        ├── pages/           # Routes: landing, play screen, mobile join
        ├── hooks/websockets.ts   # WebSocket client & message handling
        ├── lib/appState.ts       # Redux state (players, room, game phase)
        ├── constant/             # Game lists & component map
        └── games/                # Per-game screen + controller components
            └── snake/
                ├── snakeGame.tsx     # Canvas game (runs on screen)
                └── controller.tsx    # Mobile D-pad (runs on phone)
```

### Frontend state (Redux)

Global session state lives in `appState`:

- `roomId`, `name`, `role` (`screen` | `controller`)
- `players[]` — connected mobile clients with host flag
- `gamePhase` — `lobby` → `playing` → `ended`
- `selectedRow` / `selectedCol` — host's cursor in the game library
- `playingGame` — title of the currently selected game

### Backend room model

Each room has:

- **screen** — the first connection with `name === "screen"` (creates the room)
- **host** — the first mobile player to join
- **members** — all connected WebSocket clients

When the screen disconnects, the room is destroyed and the room ID is locked for 30 seconds before reuse.

---

## Project Structure

| Path | Purpose |
|------|---------|
| `frontend/src/pages/Index.tsx` | Marketing landing page |
| `frontend/src/pages/PlayGame.tsx` | Desktop/TV screen — room setup, game list, game canvas |
| `frontend/src/pages/Mobile/mobileCodeInput.tsx` | Mobile join flow (code + name entry) |
| `frontend/src/pages/Mobile/commanRemote.tsx` | Shared mobile remote (lobby D-pad + game controller slot) |
| `frontend/src/pages/GameList.tsx` | Netflix-style game browser on the screen |
| `frontend/src/hooks/websockets.ts` | WebSocket hook, message routing, lobby navigation |
| `frontend/src/constant/gameListArray.ts` | Game catalog data (rows: Hot & Free, New, Top Charts, Family) |
| `frontend/src/constant/gameComponentMap.ts` | Maps game titles → lazy-loaded screen + controller components |
| `backend/services/room_manager.py` | Core multiplayer room logic |

---

## Tech Stack

### Frontend
- **React 18** + **TypeScript**
- **Vite** — dev server & build (port `8080`)
- **React Router** — `/`, `/playgames`
- **Redux Toolkit** — session & game state
- **Tailwind CSS** + **shadcn/ui** — UI components
- **Framer Motion** — landing page animations
- **qrcode.react** — QR code for mobile join
- **Vitest** — unit tests

### Backend
- **FastAPI** — REST + WebSocket API
- **Uvicorn** — ASGI server (port `8000`)
- In-memory room storage (no database)

---

## Getting Started

### Prerequisites

- **Node.js** 18+ and **npm** (or **Bun**)
- **Python** 3.10+

---

## Running Locally

You need **both** the backend and frontend running at the same time.

### 1. Start the backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check |
| `/get_room_id` | GET | Returns a new 8-char room ID |
| `/ws/{room_id}/{name}` | WebSocket | Join a room (`name` = `"screen"` or player name) |

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:8080`.

### 3. Play

1. Open `http://localhost:8080/playgames` on your **computer** (this is the screen).
2. Note the room code or scan the QR code with your **phone**.
3. On mobile, enter your name and the room code, then tap **Let's Play**.
4. The host uses the on-screen D-pad to browse games and press **Play** to select one.

> **Tip:** Use Chrome on desktop. For the best experience, use fullscreen on the screen device.

---

## User Flow

### Screen (desktop)

```
/  →  Landing page  →  "Start playing"  →  /playgames
                                              │
                                              ├─ Fetch room ID (REST)
                                              ├─ Connect WebSocket as "screen"
                                              ├─ Show QR + room code
                                              │
                                              ├─ Players join → GameList (lobby)
                                              └─ Game selected → Game component (e.g. Snake)
```

### Mobile (controller)

```
/playgames  →  Instructions  →  Enter name + code  →  WebSocket connect
                                                        │
                                                        ├─ Lobby: D-pad (host) or wait UI (others)
                                                        └─ Playing: game-specific controller
```

### Host vs. other players

- **Host** (first phone to join): gets a D-pad in the lobby to navigate rows and select a game.
- **Other players**: see a waiting/volume-button UI in the lobby; once a game starts, they get that game's controller (e.g. Snake direction pad).

---

## WebSocket & Room System

### Connection

```
ws://localhost:8000/ws/{room_id}/{name}
```

- `room_id` — 8-character code from `/get_room_id`
- `name` — `"screen"` for the display, or the player's chosen name for phones

### Server events (screen → clients)

| Event | Payload | When |
|-------|---------|------|
| `connect` | `{ name, socket_id }` | A new member joins |
| `room_state` | `{ members[], host_socket_id }` | Sent to the joining player with full room snapshot |
| `disconnect` | `{ socket_id, name }` | A member leaves |

### Client messages (relay)

Any JSON message sent by a client is parsed and **broadcast to every member** in the room via `read_message_reply`. Common shapes:

**Lobby navigation (host → all):**
```json
{
  "from": "<host_socket_id>",
  "event": "button_press",
  "action": "up | down | left | right | select",
  "room_id": "<room_id>"
}
```

**In-game action (controller → screen):**
```json
{
  "from": "<player_socket_id>",
  "to": "<screen_socket_id>",
  "event": "start | action | over",
  "direction": { "x": 0, "y": -1 },
  "room_id": "<room_id>"
}
```

On the frontend, in-game messages are dispatched as browser `CustomEvent`s (e.g. `snake-grid/action`) so each game module can listen independently.

---

## Adding a New Game

1. **Create game modules** under `frontend/src/games/<game-name>/`:
   - `<gameName>Game.tsx` — runs on the **screen** (canvas, visuals, game loop)
   - `controller.tsx` — runs on **phones** (buttons, inputs)

2. **Register in the component map** (`frontend/src/constant/gameComponentMap.ts`):

```ts
import { lazy } from "react";

const MyGame = lazy(() => import("@/games/my-game/myGame"));
const MyController = lazy(() => import("@/games/my-game/controller"));

export const gameMap = {
  snake_grid: { game: SnakeGame, controller: SnakeController },
  my_game: { game: MyGame, controller: MyController },  // key = title lowercased, spaces → underscores
};
```

3. **Add to the catalog** in `frontend/src/constant/gameListArray.ts` so it appears in a game row.

4. **Listen for events** in both components using the same event name pattern:
   ```
   <game-title-lowercase-with-dashes>/action
   ```
   Example for "Snake Grid": `snake-grid/action`

5. **Send messages** through the WebSocket with `room_id`, `from`, `to`, and your custom `event` fields — the server relays them to all room members.

---

## Deployment

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel | `https://playdeck-beta.vercel.app` |
| Backend | Render | `https://playdeck-1.onrender.com` |

The frontend automatically switches between local and production URLs based on `NODE_ENV`:

- **Development:** `http://localhost:8000` / `ws://localhost:8000`
- **Production:** `https://playdeck-1.onrender.com` / `wss://playdeck-1.onrender.com`

CORS on the backend allows:
- `http://localhost:8080`
- `http://localhost:4173`
- `https://playdeck-beta.vercel.app`

### Build frontend for production

```bash
cd frontend
npm run build
npm run preview   # optional local preview on port 4173
```

---

## Environment & URLs

| Variable / Setting | Location | Notes |
|--------------------|----------|-------|
| Frontend dev port | `frontend/vite.config.ts` | Default: `8080` |
| Backend port | uvicorn CLI | Default: `8000` |
| Production detection | `frontend/src/lib/utils.ts` → `isProduction()` | Uses `process.env.NODE_ENV === "production"` |
| QR join URL | `PlayGame.tsx` | Points to `playdeck-beta.vercel.app/playgames?roomid=...` |

---

## Scripts Reference

### Frontend (`frontend/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run test` | Run Vitest tests |

### Backend (`backend/`)

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

---

## License

This project is part of the PlayDeck repository. Add your license here if applicable.
