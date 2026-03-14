# BizCare backend

This backend serves the frontend entrypoint at `frontend/index.html` and exposes JSON APIs for the dashboard domains (inventory, billing, clinic, etc.).

## Local MongoDB

This backend uses MongoDB as the local database.

- Default connection: `mongodb://127.0.0.1:27017/bizcare`
- Override with: `MONGODB_URI` (example: `mongodb://127.0.0.1:27017/bizcare_dev`)

The server auto-seeds the database from `backend/sample-data.js` on first run.

## Run

From the workspace root:

```powershell
cd backend
npm install
npm start
```

Optional (manual seed):

```powershell
cd backend
npm run seed
```

Then open:
- http://localhost:3000/ (serves the dashboard)
- http://localhost:3000/api/health

## Notes

- Frontend files live in `frontend/` (HTML) and `frontend/assets/` (CSS/JS).
- All data is in-memory sample data in `backend/sample-data.js` (mirrors what’s currently hard-coded in the UI).
- No database/auth is wired yet; this is a clean starting point to plug in persistence and real CRUD.
