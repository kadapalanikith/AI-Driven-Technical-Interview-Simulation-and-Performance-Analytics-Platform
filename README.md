# 🤖 AI-Driven Technical Interview Simulation and Performance Analytics Platform

> An intelligent full-stack platform that simulates real-world technical interviews using AI, evaluates candidate responses in real time, and delivers rich performance analytics and personalized feedback.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [API Reference](#-api-reference)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🧠 Overview

This platform provides a **fully AI-powered mock interview experience** — from resume parsing and dynamic question generation to speech-to-text answer capture, automated evaluation, and actionable performance reports.

Candidates can:
- Upload their resume to generate role-specific questions
- Speak or type their answers during a live interview session
- Receive instant AI-scored feedback with detailed analytics
- Review their complete interview history over time

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Auth System** | JWT-based register/login with bcrypt password hashing |
| 📄 **Resume Parsing** | Upload PDF resume → AI extracts skills, experience, and projects |
| 🎯 **Dynamic Question Generation** | Google Gemini generates tailored interview questions per role and skill level |
| 🎤 **Speech-to-Text** | AssemblyAI transcribes spoken answers in real time |
| 🤖 **AI Evaluation** | Gemini scores each answer on accuracy, depth, and communication |
| 📊 **Performance Analytics** | Per-question scores, overall rating, strengths, and improvement areas |
| 📝 **Interview History** | Past sessions stored in MongoDB; browseable from the dashboard |
| 💻 **Code Editor** | Monaco Editor integration for coding round questions |
| 🔔 **Toast Notifications** | Real-time feedback with react-hot-toast |

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + Vite 6 | UI framework and build tool |
| React Router v7 | Client-side routing |
| Axios | HTTP client for API calls |
| Monaco Editor | In-browser code editor |
| React Icons | Icon library |
| React Hot Toast | Notification system |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database and ODM |
| JSON Web Tokens (JWT) | Stateless authentication |
| bcryptjs | Password hashing |
| Multer | File uploads (resumes) |
| pdf.js-dist | PDF parsing in Node.js |
| @google/genai | Google Gemini AI integration |
| AssemblyAI SDK | Speech-to-text transcription |
| Murf AI | Text-to-speech for interview questions |
| dotenv | Environment variable management |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (React/Vite)                   │
│  LoginPage → HomePage → InterviewSetupPage                  │
│           → InterviewPage → FeedbackPage → HistoryPage      │
└──────────────────────┬──────────────────────────────────────┘
                       │  REST API (Axios)
┌──────────────────────▼──────────────────────────────────────┐
│                    SERVER (Express 5)                        │
│  /api/auth       → Auth Controller (register/login/me)      │
│  /api/resume     → Resume Controller (upload + parse)       │
│  /api/interview  → Interview Controller (start/answer/end)  │
│  /api/history    → History Controller (list/detail)         │
└──────────────────────┬──────────────────────────────────────┘
                       │
         ┌─────────────┼─────────────────┐
         ▼             ▼                 ▼
     MongoDB       Google Gemini     AssemblyAI
  (Atlas Cloud)  (Question Gen &   (Speech-to-Text)
                  AI Evaluation)
```

---

## 📁 Project Structure

```
AI-Driven-Technical-Interview-Simulation/
│
├── client/                         # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── components/             # Reusable UI components (Navbar, ProtectedRoute, …)
│   │   ├── constants/              # Static constants (roles, difficulty levels, …)
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Global auth state (login, logout, user)
│   │   ├── pages/
│   │   │   ├── LoginPage/          # Register & Login page
│   │   │   ├── HomePage/           # Dashboard / landing after login
│   │   │   ├── InterviewSetupPage/ # Role, difficulty, resume upload
│   │   │   ├── InterviewPage/      # Live interview session
│   │   │   ├── FeedbackPage/       # Post-interview analytics
│   │   │   └── HistoryPage/        # Past interview sessions
│   │   ├── services/               # Axios API service modules
│   │   ├── App.jsx                 # Route definitions
│   │   ├── App.css                 # Global styles
│   │   └── main.jsx                # React entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── .env.example                # Client environment template
│   └── package.json
│
├── server/                         # Node.js + Express backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.config.js        # MongoDB connection
│   │   ├── constants/              # Shared constants (roles, prompts, …)
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── resume.controller.js
│   │   │   ├── interview.controller.js
│   │   │   └── history.controller.js
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js   # JWT verification
│   │   │   └── error.middleware.js  # Global error handler
│   │   ├── models/
│   │   │   ├── User.model.js
│   │   │   ├── Interview.model.js
│   │   │   └── Resume.model.js
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   ├── auth.routes.js
│   │   │   ├── resume.routes.js
│   │   │   ├── interview.routes.js
│   │   │   └── history.routes.js
│   │   ├── services/               # AI integrations (Gemini, AssemblyAI, Murf)
│   │   ├── utils/                  # Utility helpers
│   │   └── app.js                  # Express app config (CORS, middleware, routes)
│   ├── server.js                   # Entry point — connects DB and starts server
│   ├── .env.example                # Server environment template
│   ├── .gitignore
│   └── package.json
│
├── .gitignore                      # Root gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier works)
- API keys for:
  - [Google Gemini](https://aistudio.google.com/app/apikey)
  - [AssemblyAI](https://www.assemblyai.com/)
  - [Murf AI](https://murf.ai/api) *(optional — for TTS)*

---

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kadapalanikith/AI-Driven-Technical-Interview-Simulation-and-Performance-Analytics-Platform.git
   cd AI-Driven-Technical-Interview-Simulation-and-Performance-Analytics-Platform
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

---

### Environment Variables

#### Server (`server/.env`)

Copy the template and fill in your values:
```bash
cp server/.env.example server/.env
```

| Variable | Description |
|---|---|
| `PORT` | Port the Express server runs on (default: `5000`) |
| `NODE_ENV` | `development` or `production` |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `JWT_EXPIRES_IN` | Token expiry duration (e.g. `7d`) |
| `GEMINI_API_KEY` | Google Gemini API key |
| `MURF_API_KEY` | Murf AI text-to-speech key |
| `ASSEMBLYAI_API_KEY` | AssemblyAI speech-to-text key |
| `CLIENT_URL` | Frontend origin for CORS (e.g. `http://localhost:5173`) |

#### Client (`client/.env`)

```bash
cp client/.env.example client/.env
```

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the Express API (e.g. `http://localhost:5000`) |

---

### Running the App

**Start the backend server:**
```bash
cd server
npm run dev
```
> Server starts at `http://localhost:5000`

**Start the frontend (in a new terminal):**
```bash
cd client
npm run dev
```
> App opens at `http://localhost:5173`

---

## 📡 API Reference

All API routes are prefixed with `/api`.

### Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/register` | ❌ | Create a new account |
| `POST` | `/auth/login` | ❌ | Login and get JWT |
| `GET` | `/auth/me` | ✅ | Fetch authenticated user profile |

### Resume — `/api/resume`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/resume/upload` | ✅ | Upload and parse a PDF resume |

### Interview — `/api/interview`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/interview/start` | ✅ | Start a new interview session |
| `POST` | `/interview/:id/answer` | ✅ | Submit an answer; get AI feedback |
| `POST` | `/interview/:id/end` | ✅ | End session and generate final report |
| `GET` | `/interview/:id` | ✅ | Fetch a specific interview session |

### History — `/api/history`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/history` | ✅ | List all past interviews for the user |
| `GET` | `/history/:id` | ✅ | Get detailed results of a past interview |

> **Auth header format:** `Authorization: Bearer <token>`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please follow the [Conventional Commits](https://www.conventionalcommits.org/) standard for commit messages.

---

## 📄 License

This project is licensed under the **MIT License**.  
Feel free to use, modify, and distribute it.

---

<p align="center">
  Built with ❤️ using React, Node.js, and Google Gemini AI
</p>
