# Project Overview — What It Is and How It Works

**Candidate:** S B Aniruddh  
**Project:** Mini SaaS Template Store

This document explains **what the app is**, **how it works**, and **how pieces connect**. Read this when you need to understand or explain the project later.

**Related docs:** [DOCS_INDEX.md](./DOCS_INDEX.md) · [FILES_AND_FOLDERS_EXPLAINED.md](./FILES_AND_FOLDERS_EXPLAINED.md) · [README.md](./README.md) · [SUBMISSION_GUIDE.md](./SUBMISSION_GUIDE.md)

---

## 1. What is this project?

**Mini SaaS Template Store** is a small full-stack web application built for the **Gnxtace Technologies Software Engineering Intern** technical assessment.

### In simple terms

Imagine a website like a mini ThemeForest or template marketplace:

- You **sign up** and **log in**.
- You **browse** ready-made website templates (portfolio, SaaS dashboard, e-commerce, etc.).
- You **favorite** templates you like.
- You open **My Favorites** to see only what you saved.

There is no payment or download — the focus is on **authentication**, **listing data**, **user-specific favorites**, and **clean UI**.

### Real-world analogy

| Real product | Our mini version |
|--------------|------------------|
| User accounts | Register + Login + JWT |
| Product catalog | Templates list with images |
| Wishlist | Favorites |
| Admin database | SQLite + Knex |

---

## 2. Tech stack (why these choices?)

| Layer | Technology | Why |
|-------|------------|-----|
| Frontend | React + Vite | Fast dev server, modern React setup (PDF allows Vite). |
| Styling | Tailwind CSS | Quick, responsive UI (PDF prefers Tailwind). |
| HTTP client | Axios | Required by PDF; easy interceptors for JWT. |
| Routing | React Router | Required pages: `/register`, `/login`, `/templates`, `/favorites`. |
| Backend | Node + Express | PDF requirement. |
| Database | SQLite | No cloud DB signup; file-based; allowed in PDF. |
| ORM | Knex | Migrations, seeds, SQL queries; allowed in PDF. |
| Auth | JWT + bcrypt | Stateless login; passwords never stored plain text. |

---

## 2b. Extra features (beyond PDF minimum)

These make the app feel more complete; all are optional for grading but **already built**:

| Feature | User sees | Technical |
|---------|-----------|-----------|
| Detail modal | Click card → full template view | `TemplateDetailModal.jsx` + `GET /api/templates/:id` |
| Toasts | Green/red messages bottom-right | `ToastContext.jsx` |
| Search & filter | Find templates by text/category | Query params on `GET /api/templates` |
| Hero + stats | Purple banner with counts | `PageHero.jsx` on Templates & Favorites |
| Skeleton loaders | Shimmer while loading | `TemplateCardSkeleton.jsx` |
| Navbar badge | Number on “My Favorites” | `GET /api/favorites/ids` |
| Guest routes | Logged-in users skip login page | `GuestRoute.jsx` |
| Light/dark theme | Navbar toggle, saved in browser | `ThemeContext.jsx` |
| Image fallback | Broken thumbnail → default image | `onError` on `<img>` |

---

## 3. High-level architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER (Browser)                        │
└─────────────────────────────┬───────────────────────────────┘
                              │
                    http://localhost:5173
                              │
┌─────────────────────────────▼───────────────────────────────┐
│                     REACT FRONTEND (client/)                 │
│  Pages: Register, Login, Templates, Favorites                │
│  Stores JWT in localStorage                                  │
│  Axios sends Authorization: Bearer <token>                   │
└─────────────────────────────┬───────────────────────────────┘
                              │
                    http://localhost:5000/api/...
                              │
┌─────────────────────────────▼───────────────────────────────┐
│                   EXPRESS BACKEND (server/)                  │
│  Routes → Controllers → Knex → SQLite database               │
└─────────────────────────────┬───────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────┐
│              SQLite file: server/data/database.sqlite        │
│  Tables: users | templates | favorites                       │
└─────────────────────────────────────────────────────────────┘
```

In development, Vite can **proxy** `/api` requests to port 5000 so the frontend avoids CORS issues.

---

## 4. Database design

### Table: `users`

Stores registered accounts.

| Column | Meaning |
|--------|---------|
| id | Unique user ID |
| name | Display name |
| email | Login email (unique) |
| password | **Hashed** password (never plain text) |

### Table: `templates`

Catalog of templates everyone can browse.

| Column | Meaning |
|--------|---------|
| id | Template ID |
| name | Title on card |
| description | Text under title |
| thumbnail_url | Image URL (Unsplash) |
| category | e.g. Portfolio, Dashboard |

**6 templates** are inserted automatically when you run `npm run setup` in `server/`.

### Table: `favorites`

Links a user to a template they saved.

| Column | Meaning |
|--------|---------|
| user_id | Who favorited |
| template_id | Which template |
| (unique pair) | Same user cannot favorite same template twice |

---

## 5. Authentication — how login works

### Registration flow

```
User fills form (name, email, password)
        ↓
Frontend: POST /api/auth/register
        ↓
Backend validates (required fields, email format, password ≥ 6 chars)
        ↓
Check email not already used
        ↓
bcrypt hashes password → save to users table
        ↓
JWT signed with user id + email
        ↓
Frontend receives { token, user }
        ↓
localStorage.setItem('token', ...)
localStorage.setItem('user', ...)
        ↓
Redirect to /templates
```

### Login flow

Same as register, but:

- `POST /api/auth/login`
- Compares password with `bcrypt.compare`
- Returns JWT on success, 401 on wrong credentials

### JWT (JSON Web Token)

- A **signed string** that proves “this request is from user X”.
- Sent on protected requests: `Authorization: Bearer eyJhbG...`
- Server verifies signature with `JWT_SECRET` from `.env`.
- Expires after 7 days (`JWT_EXPIRES_IN`).

### Logout

- Removes `token` and `user` from `localStorage`.
- No server call needed (stateless JWT).

---

## 6. Templates page — how browsing works

1. User opens `/templates`.
2. Frontend calls `GET /api/templates` (optional query: `search`, `category`).
3. Backend queries SQLite, returns JSON array.
4. If user is logged in, also calls `GET /api/favorites/ids` to know which cards show “Favorited”.
5. Cards render with image, title, description, category badge.

### Search & filter (bonus)

- **Search:** backend uses SQL `LIKE` on name and description.
- **Filter:** dropdown sends `category=Portfolio` etc.
- Debounced 300ms so typing does not spam the API.

---

## 7. Favorites — how saving works

### Add favorite (logged in)

```
User clicks "Add to Favorites" on template id=3
        ↓
Frontend: POST /api/favorites/3
        Header: Authorization: Bearer <token>
        ↓
Middleware auth.js verifies JWT → req.user.id
        ↓
Controller checks template exists
        ↓
If not already favorited → insert into favorites table
If already favorited → delete row (toggle off)
        ↓
Returns { favorited: true/false }
        ↓
Frontend updates button style and favoriteIds state
```

### View favorites page

1. User must be logged in (`ProtectedRoute` else redirect to `/login`).
2. `GET /api/favorites` returns full template objects for that user.
3. Page shows same cards; clicking heart again removes favorite.

### Not logged in

- Clicking favorite on `/templates` → redirect to `/login`.
- Visiting `/favorites` directly → redirect to `/login`.

---

## 8. API reference (quick)

| When | Method | Endpoint | Auth |
|------|--------|----------|------|
| Register | POST | `/api/auth/register` | No |
| Login | POST | `/api/auth/login` | No |
| List templates | GET | `/api/templates` | No |
| One template | GET | `/api/templates/:id` | No |
| Categories list | GET | `/api/templates/categories/list` | No |
| Toggle favorite | POST | `/api/favorites/:templateId` | Yes |
| My favorites | GET | `/api/favorites` | Yes |
| Favorite IDs only | GET | `/api/favorites/ids` | Yes |

`GET /api/templates/:id` is implemented on the backend (PDF requirement). The UI shows full details on cards; a separate detail page is optional.

---

## 9. Frontend routes map

| URL | Page | Who can access |
|-----|------|----------------|
| `/` | Redirects to `/templates` | Everyone |
| `/register` | Sign up | Everyone |
| `/login` | Sign in | Everyone |
| `/templates` | Browse catalog | Everyone (favorite needs login) |
| `/favorites` | Saved templates | **Logged-in only** |

---

## 10. Error handling

| Situation | HTTP code | Example message |
|-----------|-----------|-----------------|
| Missing fields | 400 | "Email and password are required." |
| Invalid email format | 400 | "Please provide a valid email address." |
| Wrong login | 401 | "Invalid email or password." |
| No JWT on protected route | 401 | "Access denied. No token provided." |
| Template not found | 404 | "Template not found." |
| Duplicate email | 409 | "Email is already registered." |
| Server crash | 500 | "Internal server error." |

Frontend shows red alert boxes on forms and **toast notifications** for quick feedback (favorites, login success).

---

## 11. How to run locally (step by step)

### Why 2 ports? (simple)

- **5173** = the **website** (React) → **you open this in the browser**
- **5000** = the **API** (Express + database) → runs in the background; do not use as the main link

See **[HOW_TO_RUN.md](./HOW_TO_RUN.md)** for a full explanation.

### One command (recommended, Windows CMD)

```cmd
cd /d E:\pro\fullstack-intern-task
npm install
npm run install:all
npm run setup
npm run dev
```

Use **`cd /d`** when changing from drive `C:` to `E:`. See [HOW_TO_RUN.md](./HOW_TO_RUN.md).

Open **http://localhost:5173** only.

### Two terminals (optional)

Same as above but run `npm run dev` in `server/` and `client/` separately. Still open **5173** only.

**Test manually:**

1. Open http://localhost:5173  
2. Register a new account (toast: “Account created”)  
3. Search/filter templates → open **Details** modal  
4. Click **Save** → toast + navbar badge  
5. Open **My Favorites**  
6. Logout → `/favorites` redirects to login  

---

## 12. What is working vs what you still need to do

### Confirmed working (tested)

- All required API endpoints  
- 6 seeded templates  
- JWT register/login  
- Favorites add/list  
- Frontend build (`npm run build` succeeds)  

### Submission status

| Step | Status |
|------|--------|
| README (name, email, phone) | Done |
| Local testing | Done |
| GitHub push | Pending — [SUBMISSION_GUIDE.md](./SUBMISSION_GUIDE.md) |
| Email recruiter | Pending |
| Deploy (bonus) | Optional |

Details: **[SUBMISSION_GUIDE.md](./SUBMISSION_GUIDE.md)** · Deadline: **21 May 2026, 2 PM**

### Optional “go further” (bonus 10%)

- **Deploy** backend on [Render](https://render.com), frontend on [Vercel](https://vercel.com).  
- **Demo video** (2 min) — steps in [SUBMISSION_GUIDE.md](./SUBMISSION_GUIDE.md).  

---

## 13. Interview-style summary (30 seconds)

> “I built a full-stack template store with React and Express. Users register with bcrypt-hashed passwords and receive a JWT stored in localStorage. They browse seeded templates from SQLite via Knex, search and filter by category, open a detail modal, and toggle favorites in a join table. Protected routes guard the favorites page. I used controllers, routes, middleware on the backend and pages, context, and components on the frontend, with Tailwind for a responsive UI and toast feedback.”

---

## Related docs

| Doc | Use when |
|-----|----------|
| [HOW_TO_RUN.md](./HOW_TO_RUN.md) | Which link to open, one vs two terminals |
| [DOCS_INDEX.md](./DOCS_INDEX.md) | Finding the right guide |
| [FILES_AND_FOLDERS_EXPLAINED.md](./FILES_AND_FOLDERS_EXPLAINED.md) | “What does this file do?” |
| [REQUIREMENTS_CHECKLIST.md](./REQUIREMENTS_CHECKLIST.md) | PDF compliance |
| [SUBMISSION_GUIDE.md](./SUBMISSION_GUIDE.md) | GitHub + email steps |
| [README.md](./README.md) | Run project / recruiter setup |
