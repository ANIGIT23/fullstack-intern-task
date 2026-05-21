# Submission Guide — GitHub, Email & Deploy

**Candidate:** S B Aniruddh  
**Email:** sbani2004@gmail.com  
**Phone:** +91 9940697827  

**Deadline:** 21 May 2026, before 2 PM  
**Submit to:** popedivya@gnxtace.com  

---

## What you must do (PDF requirements)

| Step | Required? | Status |
|------|-----------|--------|
| Public GitHub repo `fullstack-intern-task` | **Yes** | Do next |
| `README.md` with setup, tech stack, contact | **Yes** | Done |
| Push `client/` + `server/` | **Yes** | Do next |
| Email repo link to recruiter | **Yes** | After GitHub |
| Deploy live (Vercel / Render) | **No** (bonus 10%) | Optional |

**GitHub alone is enough to submit.** Deploy only if you have extra time.

---

## Should you push the explanation `.md` files?

| Push to GitHub? | Files |
|-----------------|--------|
| **Yes — recommended** | `README.md` (required) |
| **Yes — optional but good** | `HOW_TO_RUN.md`, `DOCS_INDEX.md`, `SUBMISSION_GUIDE.md`, `REQUIREMENTS_CHECKLIST.md`, `PROJECT_OVERVIEW_AND_HOW_IT_WORKS.md`, `FILES_AND_FOLDERS_EXPLAINED.md` |
| **Yes — required** | `client/`, `server/`, root `package.json` |
| **No — never** | `node_modules/`, `.env`, `*.sqlite`, `server/data/` |

Explanation files are **not required** by the PDF, but keeping them in the repo is fine. They help recruiters see organized work and help you later. They do **not** replace `README.md`.

Recruiters mainly read **`README.md`**. Other guides are extra.

---

## Part 1 — Push to GitHub (required)

### Step 1.1 — Create a GitHub account (if needed)

1. Go to [https://github.com/signup](https://github.com/signup)
2. Verify email and sign in

### Step 1.2 — Create a new repository

1. Go to [https://github.com/new](https://github.com/new)
2. **Repository name:** `fullstack-intern-task` (exact spelling from PDF)
3. **Visibility:** Public
4. **Do not** check “Add a README” (you already have one locally)
5. Click **Create repository**
6. Copy the page URL — you will use it in the email

### Step 1.3 — Install Git (if needed)

Open CMD and check:

```cmd
git --version
```

If missing, install from [https://git-scm.com/download/win](https://git-scm.com/download/win), then open CMD again.

### Step 1.4 — Push from your computer

Open **Command Prompt** and run **one line at a time**:

```cmd
cd /d E:\pro\fullstack-intern-task
```

```cmd
git init
```

```cmd
git add .
```

```cmd
git status
```

Check that you **do not** see `node_modules`, `.env`, or `database.sqlite` staged. If you do, stop and check `.gitignore`.

```cmd
git commit -m "Mini SaaS Template Store - Full Stack Intern Assessment"
```

```cmd
git branch -M main
```

Replace `YOUR_GITHUB_USERNAME` with your real username (from your GitHub profile URL):

```cmd
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/fullstack-intern-task.git
```

```cmd
git push -u origin main
```

- First time: GitHub may ask you to **login** (browser or personal access token).
- When done, open `https://github.com/YOUR_GITHUB_USERNAME/fullstack-intern-task` and confirm files are there.

### Step 1.5 — Verify on GitHub

Open your repo in the browser and confirm:

- [ ] Folders `client/` and `server/` exist
- [ ] `README.md` shows your name and contact
- [ ] No `node_modules` folders visible
- [ ] Repo is **Public**

---

## Part 2 — Email the recruiter (required)

**To:** popedivya@gnxtace.com  

**Subject:** Full Stack Intern Technical Assessment – S B Aniruddh  

**Body (copy and edit the GitHub link only):**

```
Dear Team,

Please find my completed technical assessment for the Software Engineering Intern position.

GitHub Repository (public):
https://github.com/YOUR_GITHUB_USERNAME/fullstack-intern-task

Tech Stack:
- Frontend: React (Vite), Tailwind CSS, Axios, React Router
- Backend: Node.js, Express.js
- Database: SQLite with Knex.js
- Authentication: JWT + bcrypt

Setup instructions are in the README.md file in the repository.

Candidate Details:
Name: S B Aniruddh
Email: sbani2004@gmail.com
Phone: +91 9940697827

Thank you for the opportunity.

Best regards,
S B Aniruddh
```

If you deployed (optional), add:

```
Live Demo: https://your-frontend-url.vercel.app
```

---

## Part 3 — Deploy online (optional bonus)

Do this **only after** GitHub push works. Estimated time: 45–60 minutes.

### Order

1. Deploy **backend** first (Render)
2. Deploy **frontend** second (Vercel)
3. Add live URL to your email

### 3.1 — Backend on Render

1. Sign up at [https://render.com](https://render.com) (GitHub login is easiest)
2. **New +** → **Web Service**
3. Connect your `fullstack-intern-task` repository
4. Settings:
   - **Name:** `template-store-api` (any name)
   - **Root Directory:** `server`
   - **Runtime:** Node
   - **Build Command:** `npm install && npm run setup`
   - **Start Command:** `npm start`
5. **Environment variables** (add in Render dashboard):
   - `JWT_SECRET` = a long random string (not the same as local if you want)
   - `PORT` = `5000`
6. Click **Create Web Service** and wait until status is **Live**
7. Copy your API URL, e.g. `https://template-store-api.onrender.com`
8. Test in browser: `https://YOUR-API.onrender.com/api/health` → should show `"status":"ok"`

**Note:** Free Render may sleep after inactivity; first request can be slow. SQLite data may reset on redeploy — OK for demo.

### 3.2 — Frontend on Vercel

1. Sign up at [https://vercel.com](https://vercel.com) (GitHub login)
2. **Add New** → **Project** → import `fullstack-intern-task`
3. Settings:
   - **Root Directory:** `client`
   - **Framework Preset:** Vite
4. **Environment Variable:**
   - `VITE_API_URL` = `https://YOUR-API.onrender.com/api` (your Render URL + `/api`)
5. Click **Deploy**
6. When done, copy the Vercel URL, e.g. `https://fullstack-intern-task.vercel.app`
7. Open it → register → test favorites

### 3.3 — CORS (if frontend cannot reach API)

If the live site shows network errors, add your Vercel URL to server CORS in `server/src/index.js` (we can help if needed after deploy).

---

## Final checklist

### Required (submit without deploy)

- [x] App tested locally
- [x] README has name, email, phone
- [ ] GitHub repo public, named `fullstack-intern-task`
- [ ] Code pushed (`client` + `server`)
- [ ] Email sent with repo link before deadline

### Optional (bonus)

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] Live demo link in email
- [ ] Short screen recording (Google Drive / YouTube)

---

## Order of work (recommended today)

```
1. GitHub push     ← required, do first
2. Email recruiter ← required, do right after
3. Deploy          ← optional, only if time left
```

---

## Related docs

| Doc | Purpose |
|-----|---------|
| [README.md](./README.md) | What recruiters read first |
| [HOW_TO_RUN.md](./HOW_TO_RUN.md) | Run locally (port 5173) |
| [DOCS_INDEX.md](./DOCS_INDEX.md) | All documentation |
| [REQUIREMENTS_CHECKLIST.md](./REQUIREMENTS_CHECKLIST.md) | PDF requirements |

Good luck, S B Aniruddh.
