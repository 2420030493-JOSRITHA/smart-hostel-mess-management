# Hostel Mess Management System - Backend & Frontend Run Guide

This project is structured with a modern **React + Vite + Tailwind CSS** frontend and a dedicated **Python Flask** REST API backend.

---

## 1. Frontend Commands (`npm`)

The frontend runs with Node.js / npm:

### Install Frontend Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
- Runs the Vite development server on `http://localhost:3000` (or `http://0.0.0.0:3000`).
- Proxies `/api/*` calls to the Flask backend running on port `5000`.

### Build for Production
```bash
npm run build
```
- Creates an optimized production bundle inside the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

### Type-Check & Lint
```bash
npm run lint
```

---

## 2. Backend Commands (`Flask / Python`)

The Flask REST API backend provides endpoints for bookings, meal menus, feedback, complaints, and student profiles.

### Setup Virtual Environment (Recommended)
```bash
python3 -m venv venv
source venv/bin/activate
# On Windows: venv\Scripts\activate
```

### Install Backend Dependencies
```bash
pip install -r requirements.txt
```

### Run Flask Backend Server
```bash
# Option A: Direct Python runner
python3 app.py

# Option B: Using Flask CLI
export FLASK_APP=app.py
export FLASK_ENV=development
flask run --host=0.0.0.0 --port=5000
```
- Backend runs on `http://localhost:5000`
- Base API prefix: `http://localhost:5000/api`

---

## 3. Run Both Frontend and Backend Concurrently

You can run both concurrently in separate terminals or using npm:

### Terminal 1 (Flask Backend):
```bash
python3 app.py
```

### Terminal 2 (React Frontend):
```bash
npm run dev
```

Or using the npm helper script:
```bash
npm run start:fullstack
```

---

## 4. Flask API Endpoints Summary

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Healthcheck & server status |
| `GET` | `/api/menus/today` | Current day's breakfast, lunch, dinner menu |
| `GET` | `/api/menus/tomorrow` | Tomorrow's planned meal menu |
| `GET` | `/api/students` | List of hostel residents |
| `GET` | `/api/students/<id_or_roll>` | Individual resident profile details |
| `GET` | `/api/bookings` | List all bookings / filter by `student_id` or `date` |
| `POST` | `/api/bookings` | Book a new meal token |
| `DELETE` | `/api/bookings/<id>` | Cancel / skip a meal booking |
| `GET` | `/api/complaints` | Get submitted complaints |
| `POST` | `/api/complaints` | File a new complaint with priority & category |
| `GET` | `/api/feedback` | Get student meal ratings & reviews |
| `POST` | `/api/feedback` | Submit star rating and meal review |
| `GET` | `/api/prep-status` | Kitchen preparation pipeline status |
| `PUT` | `/api/prep-status` | Update kitchen cooking status |
| `GET` | `/api/analytics` | Meal counts, wastage saved, attendance metrics |
