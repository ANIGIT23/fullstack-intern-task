# Mini SaaS Template Store

A full-stack web application for browsing website templates, user authentication, and saving favorites.

- **Name:** S B Aniruddh
- **Email:** sbani2004@gmail.com
- **Phone:** +91 9940697827

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js (Vite), Tailwind CSS, Axios, React Router |
| Backend | Node.js, Express.js |
| Database | SQLite |
| ORM | Knex.js |
| Authentication | JWT, bcrypt |

---

## Features

- User registration and login
- Browse templates with search and category filter
- Add and remove favorites (authenticated users)
- Protected favorites page
- Template detail view, light/dark theme, responsive UI

---

## Project Structure

```
fullstack-intern-task/
├── client/     # React frontend
├── server/     # Express API and database
└── package.json
```

---

## Prerequisites

- Node.js v18 or higher
- npm

---

## Setup Instructions

### Option 1 — Run from project root (recommended)

```bash
git clone https://github.com/YOUR_USERNAME/fullstack-intern-task.git
cd fullstack-intern-task

npm install
npm run install:all
npm run setup
npm run dev
```

Open **http://localhost:5173** in your browser.

The API runs at `http://localhost:5000` (used by the frontend automatically).

Press `Ctrl+C` to stop both servers.

### Option 2 — Run backend and frontend separately

**Backend:**

```bash
cd server
npm install
npm run setup
npm run dev
```

**Frontend (new terminal):**

```bash
cd client
npm install
npm run dev
```

Open **http://localhost:5173**.

---

## Environment Variables

**Server** — copy `server/.env.example` to `server/.env`:

```
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d
```

**Client** — copy `client/.env.example` to `client/.env` if needed:

```
VITE_API_URL=http://localhost:5000/api
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register user |
| POST | `/api/auth/login` | No | Login user |
| GET | `/api/templates` | No | List templates |
| GET | `/api/templates/:id` | No | Template details |
| POST | `/api/favorites/:templateId` | Yes | Add/remove favorite |
| GET | `/api/favorites` | Yes | User favorites |

---

## Documentation

Technical overview for reviewers: [docs/PROJECT_DOCUMENTATION.md](./docs/PROJECT_DOCUMENTATION.md)

## License

MIT
