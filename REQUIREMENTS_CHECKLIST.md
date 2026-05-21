# PDF Requirements Checklist

**Candidate:** S B Aniruddh  
**Assessment:** Gnxtace Technologies — Full Stack Web Developer Intern

Use this before submitting.

**How to run (Windows CMD):** `cd /d E:\pro\fullstack-intern-task` then `npm run dev` → open **5173**.  
**Full steps:** **[HOW_TO_RUN.md](./HOW_TO_RUN.md)** · Docs map: **[DOCS_INDEX.md](./DOCS_INDEX.md)**

---

## Tech stack (required)

| Requirement | Status | What we used |
|-------------|--------|--------------|
| React.js (Vite or CRA) | Done | React + **Vite** |
| Tailwind CSS (preferred) | Done | Tailwind v4 via `@tailwindcss/vite` |
| Node.js + Express | Done | Express 5 |
| SQLite, PostgreSQL, or MongoDB | Done | **SQLite** (allowed in PDF) |
| Knex.js or Mongoose | Done | **Knex.js** |
| Git + public GitHub repo | **Pending — you** | Push to `fullstack-intern-task` |

---

## Core features (required)

| Feature | Status | Where |
|---------|--------|-------|
| Register & Login | Done | `/register`, `/login` + `POST /api/auth/register`, `POST /api/auth/login` |
| View template list | Done | `/templates` + `GET /api/templates` |
| Mark as Favorite | Done | Save button + `POST /api/favorites/:templateId` |
| My Favorites section | Done | `/favorites` + `GET /api/favorites` |

---

## Backend (required)

| Requirement | Status | Notes |
|-------------|--------|-------|
| JWT authentication | Done | `jsonwebtoken` + `middleware/auth.js` |
| Password hashing (bcrypt) | Done | `bcryptjs` in `authController.js` |
| Template fields: id, name, description, thumbnail_url, category | Done | `templates` table in migration |
| `GET /api/templates` | Done | 6 seeded templates |
| `GET /api/templates/:id` | Done | Used by detail modal |
| `POST /api/favorites/:templateId` (auth required) | Done | JWT middleware |
| `GET /api/favorites` (logged-in user) | Done | Joins template data |
| Seed ≥ 5 templates | Done | 6 in `seeds/templates.js` |
| Register/login validation | Done | Email, password length, required fields |
| HTTP status codes + JSON | Done | 400, 401, 404, 409, 500 |

---

## Frontend (required)

| Requirement | Status | Notes |
|-------------|--------|-------|
| Page `/register` | Done | `pages/Register.jsx` |
| Page `/login` | Done | `pages/Login.jsx` |
| Page `/templates` | Done | `pages/Templates.jsx` |
| Page `/favorites` | Done | `pages/Favorites.jsx` |
| JWT in localStorage | Done | `AuthContext.jsx` |
| Axios for API calls | Done | `api/axios.js` |
| Template cards + Favorite button | Done | `TemplateCard.jsx` |
| Show already-favorited state | Done | `GET /api/favorites/ids` |
| Auth redirect for favorites | Done | `ProtectedRoute.jsx` |
| Clean responsive UI | Done | Tailwind |
| Card: image, title, description | Done | `TemplateCard.jsx` |

---

## Bonus (PDF optional — implemented)

| Bonus | Status |
|-------|--------|
| Search templates | Done |
| Filter by category | Done |
| Clear filters button | Done |
| Logout button | Done |
| Protected routes | Done |
| Template detail modal | Done |
| Toast notifications | Done |
| Loading skeletons | Done |
| Favorites navbar badge | Done |
| Guest routes (skip login if logged in) | Done |
| Deploy backend (Render/Vercel) | **Not done** — optional |
| Deploy frontend (Vercel/Netlify) | **Not done** — optional |

---

## Submission (action items)

| Step | Status |
|------|--------|
| Name, email, phone in README | Done |
| Local testing | Done |
| Public GitHub `fullstack-intern-task` | Pending |
| Push `client/` + `server/` | Pending |
| Email popedivya@gnxtace.com | Pending |
| Deploy (bonus) | Optional |
| Deadline **21 May 2026, 2 PM** | — |

**How to submit:** [SUBMISSION_GUIDE.md](./SUBMISSION_GUIDE.md)

---

## Evaluation criteria

| Area (weight) | Coverage |
|---------------|----------|
| Code Structure (25%) | controllers, routes, middleware, pages, components, context |
| Functionality (25%) | All required features working |
| UI & UX (20%) | Responsive UI, modals, toasts, skeletons, empty states |
| API Integration (20%) | Axios + JWT + Vite proxy |
| Bonus (10%) | Search, filter, modal, deploy optional |

---

## Related documentation

| Doc | Purpose |
|-----|---------|
| [DOCS_INDEX.md](./DOCS_INDEX.md) | Master index |
| [PROJECT_OVERVIEW_AND_HOW_IT_WORKS.md](./PROJECT_OVERVIEW_AND_HOW_IT_WORKS.md) | How the app works |
| [FILES_AND_FOLDERS_EXPLAINED.md](./FILES_AND_FOLDERS_EXPLAINED.md) | File reference |
| [README.md](./README.md) | Setup for recruiters |
