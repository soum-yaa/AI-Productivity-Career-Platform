# AI Productivity & Career Management Platform

Production-oriented MERN stack boilerplate: **React (Vite) + Tailwind** client and **Express + MongoDB (Mongoose)** API, with JWT-oriented auth structure, CORS, centralized errors, and a scalable folder layout.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (LTS recommended)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

## Quick start

### 1. Install dependencies

From the repository root:

```bash
npm run install:all
```

Or step by step:

```bash
npm install
npm install --prefix client
npm install --prefix server
```

### 2. Environment variables

**Server** — copy the example file and edit values:

```bash
copy server\.env.example server\.env
```

On macOS/Linux:

```bash
cp server/.env.example server/.env
```

Set `MONGO_URI`, `JWT_SECRET`, and optionally `PORT`.

Optional: set `CLIENT_URL` to a comma-separated allowlist for browser origins (for example `http://localhost:5173`). When omitted, CORS reflects a permissive development default.

**Client** — copy and set the API base URL (must be prefixed with `VITE_`):

```bash
copy client\.env.example client\.env.local
```

Set `VITE_API_URL` (e.g. `http://localhost:5000`).

### 3. Run client and server together

```bash
npm run dev
```

- Client: Vite dev server (default `http://localhost:5173`)
- Server: Express (default `http://localhost:5000`)

### Individual processes

```bash
npm run client
npm run server
```

## Project structure

```
mern-ai-platform/
├── client/          # React + Vite + Tailwind
├── server/          # Express + Mongoose
├── package.json     # Root scripts + concurrently
└── README.md
```

## API routes (initial)

| Prefix        | Purpose        |
|---------------|----------------|
| `/api/auth`   | `POST /register`, `POST /login`, `GET /me` (Bearer) |
| `/api/tasks`  | `GET /`, `POST /` (Bearer) — tasks scoped to the signed-in user |
| `/api/users`  | `GET /me` (Bearer) — profile placeholder |

Health check (no prefix): `GET /health`.

## Scripts reference

| Command            | Description                          |
|--------------------|--------------------------------------|
| `npm run dev`      | Run client + server in parallel      |
| `npm run install:all` | Install root, client, and server deps |
| `npm run build`    | Production build (client)            |
| `npm run lint`     | Lint client and server               |

## Tech stack

- **Client:** React 19, Vite, Tailwind CSS, React Router, Axios, Framer Motion
- **Server:** Node.js, Express, Mongoose, JWT utilities, CORS, centralized error handling

## License

MIT (adjust as needed for your product).
