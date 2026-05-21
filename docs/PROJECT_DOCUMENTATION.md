# Mini SaaS Template Store — Technical Documentation

**Author:** S B Aniruddh  
**Project:** Full Stack Web Developer Intern Assessment  
**Organization:** Gnxtace Technologies Pvt. Ltd.

---

## 1. Executive Summary

Mini SaaS Template Store is a full-stack web application that enables users to register, authenticate, browse website templates, and maintain a personal favorites list. The system follows a client–server architecture with a React single-page application and a RESTful Express API backed by SQLite.

---

## 2. System Architecture

```
┌──────────────┐     HTTPS/HTTP      ┌──────────────┐     SQL      ┌──────────────┐
│   Browser    │ ◄─────────────────► │  Express API │ ◄──────────► │   SQLite     │
│  React (SPA) │   JSON + JWT        │   (server/)  │    Knex      │  Database    │
└──────────────┘                     └──────────────┘              └──────────────┘
```

| Layer | Technology | Responsibility |
|-------|------------|----------------|
| Presentation | React 19, Vite, Tailwind CSS | UI, routing, client state |
| Application | Node.js, Express 5 | Business logic, authentication, APIs |
| Data | SQLite, Knex.js | Persistence, migrations, seed data |

---

## 3. Project Structure

```
fullstack-intern-task/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── api/            # HTTP client (Axios)
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Global state (auth, theme, toast)
│   │   └── pages/          # Route-level views
│   └── package.json
├── server/                 # Backend application
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API route definitions
│   │   ├── middleware/     # JWT verification
│   │   └── db/             # Migrations and seeds
│   └── package.json
├── docs/                   # Technical documentation
└── README.md               # Setup and contact information
```

---

## 4. Functional Requirements

| Feature | Description | Implementation |
|---------|-------------|----------------|
| User registration | Create account with validation | `POST /api/auth/register` |
| User login | Authenticate and receive JWT | `POST /api/auth/login` |
| Template catalog | List and search templates | `GET /api/templates` |
| Template details | View single template | `GET /api/templates/:id` |
| Favorites | Save/remove templates per user | `POST /api/favorites/:id`, `GET /api/favorites` |
| Protected access | Restrict favorites to authenticated users | JWT middleware |

---

## 5. Database Schema

### Table: `users`
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| name | VARCHAR | Display name |
| email | VARCHAR | Unique login identifier |
| password | VARCHAR | bcrypt hash |

### Table: `templates`
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| name | VARCHAR | Template title |
| description | TEXT | Template summary |
| thumbnail_url | VARCHAR | Preview image URL |
| category | VARCHAR | Classification (Portfolio, Blog, etc.) |

### Table: `favorites`
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| user_id | INTEGER | Foreign key → users |
| template_id | INTEGER | Foreign key → templates |

A unique constraint on `(user_id, template_id)` prevents duplicate favorites.

---

## 6. Authentication Flow

1. User submits credentials via `/register` or `/login`.
2. Server validates input, hashes passwords with bcrypt (registration).
3. On success, server issues a signed JWT (7-day expiry).
4. Client stores the token in `localStorage`.
5. Subsequent API requests include `Authorization: Bearer <token>`.
6. Protected routes verify the token before executing controller logic.

---

## 7. API Reference

| Method | Endpoint | Authentication | Description |
|--------|----------|----------------|-------------|
| POST | `/api/auth/register` | No | Create user account |
| POST | `/api/auth/login` | No | Authenticate user |
| GET | `/api/templates` | No | List templates (supports `search`, `category` query params) |
| GET | `/api/templates/:id` | No | Retrieve template by ID |
| GET | `/api/templates/categories/list` | No | List available categories |
| POST | `/api/favorites/:templateId` | Yes | Toggle favorite status |
| GET | `/api/favorites` | Yes | List user's favorited templates |
| GET | `/api/favorites/ids` | Yes | List favorited template IDs |
| GET | `/api/health` | No | Service health check |

---

## 8. Frontend Routes

| Route | Component | Access |
|-------|-----------|--------|
| `/` | Redirect → `/templates` | Public |
| `/register` | Registration form | Public (guest only) |
| `/login` | Login form | Public (guest only) |
| `/templates` | Template catalog | Public |
| `/favorites` | User favorites | Authenticated |

---

## 9. Key Modules

### Backend

| Module | Purpose |
|--------|---------|
| `authController.js` | Registration, login, password hashing, JWT issuance |
| `templateController.js` | Template queries, search, filtering |
| `favoriteController.js` | Favorite persistence and retrieval |
| `auth.js` (middleware) | JWT validation for protected endpoints |
| `001_create_tables.js` | Database schema migration |
| `templates.js` (seed) | Initial template dataset (6 records) |

### Frontend

| Module | Purpose |
|--------|---------|
| `AuthContext.jsx` | Session state and localStorage persistence |
| `axios.js` | API client with JWT interceptor |
| `TemplateCard.jsx` | Template display and favorite action |
| `TemplateDetailModal.jsx` | Detailed template view |
| `ProtectedRoute.jsx` | Route guard for authenticated pages |
| `ThemeContext.jsx` | Light/dark theme preference |

---

## 10. Environment Configuration

### Server (`server/.env`)

| Variable | Description |
|----------|-------------|
| `PORT` | API server port (default: 5000) |
| `JWT_SECRET` | Secret key for token signing |
| `JWT_EXPIRES_IN` | Token lifetime (default: 7d) |
| `FRONTEND_URL` | Allowed CORS origin for production |
| `DATABASE_PATH` | SQLite file path (optional) |

### Client (`client/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL |

---

## 11. Local Development

From the project root:

```bash
npm install
npm run install:all
npm run setup
npm run dev
```

Access the application at **http://localhost:5173**. The API listens on port **5000**.

---

## 12. Additional Features

Beyond the core assessment requirements, the application includes search and category filtering, template detail modal, toast notifications, loading skeletons, light/dark theme toggle, and responsive layout optimization.

---

## 13. Contact

- **Name:** S B Aniruddh  
- **Email:** sbani2004@gmail.com  
- **Phone:** +91 9940697827  
