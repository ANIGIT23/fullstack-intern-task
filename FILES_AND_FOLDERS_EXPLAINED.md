# Files and Folders Explained

**Candidate:** S B Aniruddh  
**Project:** Mini SaaS Template Store

This document explains **what every important file and folder does**. Use it when you return to this project later or prepare for an interview.

**Related docs:** [DOCS_INDEX.md](./DOCS_INDEX.md) · [PROJECT_OVERVIEW_AND_HOW_IT_WORKS.md](./PROJECT_OVERVIEW_AND_HOW_IT_WORKS.md) · [README.md](./README.md)

---

## Root folder: `fullstack-intern-task/`

| File / folder | Purpose |
|---------------|---------|
| **`HOW_TO_RUN.md`** | **How to start the app** — which URL (5173), why 2 ports, one-command `npm run dev`. |
| **`package.json`** (root) | Runs **both** client + server with `npm run dev` (uses `concurrently`). |
| **`DOCS_INDEX.md`** | Index of all documentation and quick links. |
| **`README.md`** | Main docs for recruiters: setup, tech stack, APIs, contact. |
| **`SUBMISSION_GUIDE.md`** | How to push GitHub and email the recruiter. |
| **`REQUIREMENTS_CHECKLIST.md`** | PDF requirements vs what is built / pending. |
| **`FILES_AND_FOLDERS_EXPLAINED.md`** | This file — each file’s role. |
| **`PROJECT_OVERVIEW_AND_HOW_IT_WORKS.md`** | App purpose, flows, auth, favorites, architecture. |
| **`.gitignore`** | Git ignore: `node_modules`, `.env`, `database.sqlite`, `dist/`. |
| **`client/`** | Frontend (React + Vite). |
| **`server/`** | Backend (Express + SQLite). |

---

## Server folder: `server/`

The backend handles users, templates, favorites, and security.

### Configuration files

| File | Purpose |
|------|---------|
| **`package.json`** | Lists backend dependencies (`express`, `knex`, `bcryptjs`, etc.) and scripts: `npm run dev`, `npm run setup` (migrate + seed). |
| **`package-lock.json`** | Locks exact dependency versions so `npm install` is reproducible on any machine. **Auto-generated** — do not edit by hand. |
| **`.env`** | Secret/local settings: `PORT`, `JWT_SECRET`. **Never commit real secrets** to public GitHub — use `.env.example` as a template. |
| **`.env.example`** | Sample env file for others cloning your repo (no real secrets). |
| **`knexfile.js`** | Knex configuration: SQLite file path, folders for migrations and seeds. Creates `data/` folder if missing. |
| **`.gitignore`** | Ignores `node_modules/`, `data/*.sqlite`, `.env` from Git. |

### `server/data/`

| Item | Purpose |
|------|---------|
| **`database.sqlite`** | The actual database file (created after `npm run setup`). Stores users, templates, favorites. |

### `server/src/` — application code

| File | Purpose |
|------|---------|
| **`index.js`** | **Entry point.** Starts Express, enables CORS and JSON parsing, mounts routes (`/api/auth`, `/api/templates`, `/api/favorites`), listens on port 5000. |

### `server/src/db/`

| File | Purpose |
|------|---------|
| **`index.js`** | Creates and exports the Knex database connection used everywhere. |
| **`migrations/001_create_tables.js`** | Defines database tables: `users`, `templates`, `favorites` (with foreign keys). Run once via `npm run migrate`. |
| **`seeds/templates.js`** | Inserts 6 sample templates (images from Unsplash). Run via `npm run seed`. |

### `server/src/controllers/`

Controllers contain **business logic** (what happens when an API is called).

| File | Purpose |
|------|---------|
| **`authController.js`** | `register`: validate input, hash password, save user, return JWT. `login`: check email/password, return JWT. |
| **`templateController.js`** | List templates (with optional search/category), get one template by id, list categories. |
| **`favoriteController.js`** | Add/remove favorite (toggle), list user’s favorites, list favorite template IDs for the UI. |

### `server/src/routes/`

Routes map **URLs to controller functions**.

| File | Purpose |
|------|---------|
| **`authRoutes.js`** | `POST /register`, `POST /login` under `/api/auth`. |
| **`templateRoutes.js`** | `GET /`, `GET /categories/list`, `GET /:id` under `/api/templates`. |
| **`favoriteRoutes.js`** | All routes require JWT. `GET /`, `GET /ids`, `POST /:templateId` under `/api/favorites`. |

### `server/src/middleware/`

| File | Purpose |
|------|---------|
| **`auth.js`** | Reads `Authorization: Bearer <token>`, verifies JWT, attaches `req.user` for protected routes. |

---

## Client folder: `client/`

The frontend is what users interact with in the browser.

### Configuration & build files

| File | Purpose |
|------|---------|
| **`package.json`** | Frontend dependencies: `react`, `axios`, `react-router-dom`, `tailwindcss`, scripts `dev` / `build`. |
| **`package-lock.json`** | Locked versions for frontend packages. |
| **`vite.config.js`** | Vite settings: React plugin, Tailwind plugin, **dev proxy** so `/api` calls go to `localhost:5000`. |
| **`.env`** | `VITE_API_URL` — base URL for Axios (e.g. `http://localhost:5000/api`). |
| **`index.html`** | Single HTML page; React mounts into `<div id="root">`. |
| **`eslint.config.js`** | Lint rules for code quality (Vite default). |
| **`.gitignore`** | Ignores `node_modules`, `dist`, `.env`. |
| **`README.md`** | Default Vite readme (optional; main docs are in root `README.md`). |

### `client/public/`

Static files served as-is (not processed by React).

| File | Purpose |
|------|---------|
| **`favicon.svg`** | Small icon in browser tab. |

### `client/src/` — React application

| File | Purpose |
|------|---------|
| **`main.jsx`** | Entry point: renders `<App />` into the DOM, imports global CSS. |
| **`index.css`** | Global styles + `@import "tailwindcss"` for utility classes. |
| **`App.jsx`** | All **routes**; wraps app in `AuthProvider` + `ToastProvider`; includes `Footer`. |
| **`App.css`** | Default Vite styles (mostly unused; Tailwind handles styling). |

### `client/src/api/`

| File | Purpose |
|------|---------|
| **`axios.js`** | Creates Axios instance, adds JWT to every request from `localStorage`, exports `authAPI`, `templateAPI`, `favoriteAPI` helper functions. |

### `client/src/context/`

| File | Purpose |
|------|---------|
| **`AuthContext.jsx`** | Global login state; `login()`, `logout()`, `localStorage` for token + user. |
| **`ToastContext.jsx`** | Green/red toast messages (e.g. “Added to favorites”, “Welcome back”). |

### `client/src/components/`

Reusable UI pieces.

| File | Purpose |
|------|---------|
| **`Navbar.jsx`** | Sticky top nav; links; favorites **count badge**; logout. |
| **`ProtectedRoute.jsx`** | Blocks `/favorites` if not logged in → redirect `/login`. |
| **`GuestRoute.jsx`** | Blocks `/login` and `/register` if already logged in → redirect `/templates`. |
| **`TemplateCard.jsx`** | Card: image, title, description, **Details** + **Save** buttons; image fallback. |
| **`TemplateCardSkeleton.jsx`** | Gray animated placeholder while templates load. |
| **`TemplateDetailModal.jsx`** | Popup with full template info; calls `GET /api/templates/:id`. |
| **`PageHero.jsx`** | Purple gradient banner with title, subtitle, stat chips. |
| **`Footer.jsx`** | Bottom footer with project name and tech stack line. |

### `client/src/pages/`

Full pages for each URL.

| File | Purpose |
|------|---------|
| **`Register.jsx`** | Registration form → calls API → saves JWT → redirects to `/templates`. |
| **`Login.jsx`** | Login form → same flow as register. |
| **`Templates.jsx`** | Templates grid, search/filter, modal, toasts, hero stats, skeletons. |
| **`Favorites.jsx`** | User’s saved templates; modal; remove favorite with toast. |

### `client/src/assets/`

| File | Purpose |
|------|---------|
| **`react.svg`, `vite.svg`, `hero.png`** | Default or optional images from Vite scaffold (not required for core features). |

### `client/dist/` (after `npm run build`)

| Purpose |
|---------|
| Production build output — static files ready to deploy to Netlify/Vercel. **Usually not committed** to Git. |

---

## Common file types (quick reference)

| Type | Example | What it does |
|------|---------|--------------|
| **`.json`** | `package.json` | Config/data in JSON format; npm uses it for dependencies and scripts. |
| **`.js` / `.jsx`** | `index.js`, `App.jsx` | JavaScript code; `.jsx` allows HTML-like syntax (JSX) in React. |
| **`.env`** | `.env` | Environment variables (secrets, URLs) loaded at runtime. |
| **`.md`** | `README.md` | Markdown documentation (readable on GitHub). |
| **`.sqlite`** | `database.sqlite` | Single-file SQL database — no separate database server needed. |
| **`package-lock.json`** | Both client & server | Exact dependency tree for reliable installs. |

---

## Folder structure diagram

```
fullstack-intern-task/
├── DOCS_INDEX.md                       ← documentation map (start here)
├── README.md
├── SUBMISSION_GUIDE.md
├── REQUIREMENTS_CHECKLIST.md
├── FILES_AND_FOLDERS_EXPLAINED.md      ← you are here
├── PROJECT_OVERVIEW_AND_HOW_IT_WORKS.md
├── client/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx          → starts React
│       ├── App.jsx           → routes
│       ├── api/axios.js        → HTTP client
│       ├── context/            → auth state
│       ├── components/         → reusable UI
│       └── pages/              → full screens
└── server/
    ├── package.json
    ├── knexfile.js
    ├── .env
    └── src/
        ├── index.js            → starts Express
        ├── controllers/        → logic
        ├── routes/             → URLs
        ├── middleware/         → JWT check
        └── db/
            ├── migrations/     → table schema
            └── seeds/          → sample data
```

---

## What to study first (learning order)

1. `server/src/index.js` — how the API starts  
2. `server/src/routes/` + `controllers/` — what each endpoint does  
3. `client/src/App.jsx` — which page maps to which URL  
4. `client/src/context/AuthContext.jsx` — how login state works  
5. `client/src/api/axios.js` — how frontend calls backend  

For the full story of **how data flows** when a user favorites a template, read **[PROJECT_OVERVIEW_AND_HOW_IT_WORKS.md](./PROJECT_OVERVIEW_AND_HOW_IT_WORKS.md)**.

Back to all docs: **[DOCS_INDEX.md](./DOCS_INDEX.md)**
