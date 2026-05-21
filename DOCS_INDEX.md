# Project Documentation Index

**Candidate:** S B Aniruddh  
**Project:** Mini SaaS Template Store (Gnxtace Technologies — Full Stack Intern Assessment)

Use this page as your **main entry point** when you come back to this project months later and need to remember how anything works.

---

## Start here — which doc to read?

| I want to… | Read this |
|------------|-----------|
| **Run the app / which link to open / why 2 ports** | **[HOW_TO_RUN.md](./HOW_TO_RUN.md)** ← read this first |
| **Run the app (short)** | [README.md](./README.md) → `npm run dev` → open **5173** |
| **Submit to recruiter (GitHub, email)** | [SUBMISSION_GUIDE.md](./SUBMISSION_GUIDE.md) |
| **Check if PDF requirements are done** | [REQUIREMENTS_CHECKLIST.md](./REQUIREMENTS_CHECKLIST.md) |
| **Understand what the app does & user flows** | [PROJECT_OVERVIEW_AND_HOW_IT_WORKS.md](./PROJECT_OVERVIEW_AND_HOW_IT_WORKS.md) |
| **Know what each file/folder is for** | [FILES_AND_FOLDERS_EXPLAINED.md](./FILES_AND_FOLDERS_EXPLAINED.md) |
| **Find any doc quickly** | This file (`DOCS_INDEX.md`) |

---

## All documentation files

| File | Audience | Contents |
|------|----------|----------|
| [HOW_TO_RUN.md](./HOW_TO_RUN.md) | Everyone | **Why 2 ports, which URL, one-command start** |
| [README.md](./README.md) | Recruiter + you | Setup, tech stack, API list, features, contact info |
| [DOCS_INDEX.md](./DOCS_INDEX.md) | You (future reference) | Map of all docs — read this first when returning to the project |
| [SUBMISSION_GUIDE.md](./SUBMISSION_GUIDE.md) | You (before deadline) | GitHub push, email template, deploy, demo checklist |
| [REQUIREMENTS_CHECKLIST.md](./REQUIREMENTS_CHECKLIST.md) | You + recruiter | PDF requirements vs implemented features |
| [PROJECT_OVERVIEW_AND_HOW_IT_WORKS.md](./PROJECT_OVERVIEW_AND_HOW_IT_WORKS.md) | You (learning / interview) | Architecture, auth, favorites, APIs, troubleshooting |
| [FILES_AND_FOLDERS_EXPLAINED.md](./FILES_AND_FOLDERS_EXPLAINED.md) | You (code navigation) | Every important file explained |

---

## Project at a glance

```
User → React (client/) → Express API (server/) → SQLite (database.sqlite)
```

**Core flow:** Register/Login → Browse templates → Save favorites → View My Favorites

**Extra features built:** Search, category filter, detail modal, toasts, skeleton loaders, navbar badge, protected routes, guest routes.

---

## Quick commands (copy-paste)

**Easiest — one terminal (Windows CMD):**
```cmd
cd /d E:\pro\fullstack-intern-task
npm install
npm run install:all
npm run setup
npm run dev
```

> Use **`cd /d`** when moving from `C:` to `E:`. Details: [HOW_TO_RUN.md](./HOW_TO_RUN.md)

**Open in browser:** http://localhost:5173 **only**

Full explanation: **[HOW_TO_RUN.md](./HOW_TO_RUN.md)**

---

## Before you submit

1. [x] README updated (name, email, phone) — **S B Aniruddh**
2. [x] App tested locally
3. [ ] GitHub push — see [SUBMISSION_GUIDE.md](./SUBMISSION_GUIDE.md) Part 1
4. [ ] Email recruiter — Part 2
5. [ ] (Optional) Deploy — Part 3

**Deadline:** 21 May 2026, before 2 PM.

---

## Contact (in README)

| Field | Value |
|-------|--------|
| Name | S B Aniruddh |
| Email | sbani2004@gmail.com |
| Phone | +91 9940697827 |

---

## Code locations cheat sheet

| Feature | Frontend | Backend |
|---------|----------|---------|
| Login / Register | `client/src/pages/Login.jsx`, `Register.jsx` | `server/src/controllers/authController.js` |
| Templates list | `client/src/pages/Templates.jsx` | `server/src/controllers/templateController.js` |
| Favorites | `client/src/pages/Favorites.jsx` | `server/src/controllers/favoriteController.js` |
| JWT check | `client/src/api/axios.js` | `server/src/middleware/auth.js` |
| Detail modal | `client/src/components/TemplateDetailModal.jsx` | `GET /api/templates/:id` |
| Database schema | — | `server/src/db/migrations/001_create_tables.js` |
| Sample data | — | `server/src/db/seeds/templates.js` |

---

*Last updated: May 2026 — Full Stack Intern Task*
