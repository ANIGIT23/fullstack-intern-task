# How to Run This Project (Simple Guide)

**Candidate:** S B Aniruddh

**Short answer:** Go to the project folder → run `npm run dev` → open **http://localhost:5173** in the browser.

---

## Windows: open the project folder (read this first)

You are using **Command Prompt (CMD)**. On Windows, changing to a folder on **drive E:** needs a special command.

### Correct (use this)

```cmd
cd /d E:\pro\fullstack-intern-task
```

Your prompt should change to something like:

```text
E:\pro\fullstack-intern-task>
```

If you still see `C:\Users\SUJETHA>`, the folder did **not** change — use `cd /d` as above.

### Wrong (do not do this)

| What you typed | Why it fails |
|----------------|--------------|
| `cd e:\pro\fullstack-intern-task` (from `C:\Users\...`) | On CMD, `cd` alone often **does not switch drives** — you stay on `C:` |
| `E:\pro\fullstack-intern-task` (path alone, no `cd`) | CMD tries to **run** that text as a program → *"is not recognized as an internal or external command"* |

### Other ways that work on CMD

**Option A — switch drive, then folder:**
```cmd
E:
cd \pro\fullstack-intern-task
```

**Option B — one line (best):**
```cmd
cd /d E:\pro\fullstack-intern-task
```

> **Note:** `/d` means “change **drive** and **directory**”. Always use it when going from `C:` to `E:`.

---

## Why 2 ports? (website vs API)

| Part | Port | Open in browser? |
|------|------|------------------|
| **Website** (React, `client/`) | **5173** | **YES — only this** |
| **API** (Express, `server/`) | 5000 | No (data only; runs in background) |

Opening `http://localhost:5000` shows JSON, not the app. That is normal.

---

## Run the app — one terminal (recommended)

### Step 1 — go to project folder (CMD)

```cmd
cd /d E:\pro\fullstack-intern-task
```

### Step 2 — first time only (setup once)

```cmd
npm install
npm run install:all
npm run setup
```

### Step 3 — start the app (every time)

```cmd
npm run dev
```

Wait until you see lines for **API** (port 5000) and **WEB** (port 5173).

### Step 4 — open in browser

**http://localhost:5173**

Stop: press `Ctrl + C` in the same CMD window.

---

## Alternative — two CMD windows

Both windows need `cd /d` if you start from `C:\Users\...`.

**Window 1 — API:**
```cmd
cd /d E:\pro\fullstack-intern-task\server
npm run dev
```

**Window 2 — website:**
```cmd
cd /d E:\pro\fullstack-intern-task\client
npm run dev
```

Still open only: **http://localhost:5173**

---

## What you should see when it works

1. CMD prompt shows `E:\pro\fullstack-intern-task>` before you run `npm` commands  
2. Browser at **5173** → Template Store, purple header, template cards  
3. Register → Login → Save → My Favorites works  

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `'E:\pro\...' is not recognized` | You typed the path **without** `cd /d`. Use: `cd /d E:\pro\fullstack-intern-task` |
| Still on `C:\Users\SUJETHA>` after `cd e:\...` | Use `cd /d E:\pro\fullstack-intern-task` (with **`/d`**) |
| `npm` is not recognized | Install Node.js from https://nodejs.org then open CMD again |
| Port 5173 cannot connect | Run `npm run dev` from `E:\pro\fullstack-intern-task` |
| Login/register fails | Backend not running — run `npm run dev` from project root |
| No templates | Run `npm run setup` once from project root |
| JSON / Route not found on **5000** | Normal for API; use **5173** for the website |

---

## For recruiters

```cmd
cd /d path\to\fullstack-intern-task
npm install
npm run install:all
npm run setup
npm run dev
```

Open **http://localhost:5173**.

---

## Related docs

- [README.md](./README.md) — project overview  
- [DOCS_INDEX.md](./DOCS_INDEX.md) — all guides  
- [PROJECT_OVERVIEW_AND_HOW_IT_WORKS.md](./PROJECT_OVERVIEW_AND_HOW_IT_WORKS.md) — how it works  
