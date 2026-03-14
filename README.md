# BizCare (Local Business + Clinic Dashboard)

Single-page dashboard + Node/Express backend with MongoDB (local or Atlas) for products, invoices, customers, shops, users, and orders.

## Quick start

### 1) Install backend deps

```bash
cd backend
npm install
```

### 2) Configure environment

Copy the example env file and fill it:

```bash
cd backend
# Windows PowerShell
Copy-Item .env.example .env
```

Edit `backend/.env` and set:
- `MONGODB_URI` (local MongoDB or Atlas)
- `SESSION_SECRET` (any long random string)

Atlas example (recommended):

```text
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>/bizcare?retryWrites=true&w=majority
```

Notes:
- If your password has special characters, URL-encode it.
- In Atlas, ensure **Network Access** allows your IP and the user has DB access.

### 3) Run the server

```bash
cd backend
node server.js
```

Open:
- http://localhost:3000/

## Demo logins

- Admin: `admin / admin123`
- Shopkeeper: `shop / shop123`
- User: `user / user123`

## Project structure

- `frontend/` — SPA UI (HTML/CSS/JS)
- `backend/` — Express API + MongoDB

More backend details: see `backend/README.md`.
