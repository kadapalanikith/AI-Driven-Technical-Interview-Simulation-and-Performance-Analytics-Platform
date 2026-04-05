# 🤖 AI-Driven Technical Interview Simulation & Performance Analytics Platform

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
| Monaco Editor (`@monaco-editor/react`) | In-browser code editor for coding questions |
| Web Speech API | Browser-native speech recognition (ConversationalMic) |
| MediaRecorder API | Browser-native audio recording (VoiceRecorder) |
| React Icons | Icon library |
| React Hot Toast | Notification system |

### Backend
| Technology | Purpose |
|---|---|
| Node.js v18+ + Express 5 | REST API server |
| MongoDB Atlas + Mongoose 9 | Cloud database and ODM |
| JSON Web Tokens (JWT) | Stateless authentication |
| bcryptjs | Password hashing |
| Multer (memory storage) | File uploads — PDF resume & audio |
| pdfjs-dist (legacy build) | PDF text extraction in Node.js |
| @google/genai | Google Gemini 2.5 Flash AI integration |
| AssemblyAI SDK | Speech-to-text transcription (`speech_model: universal`) |
| Murf AI REST API | Text-to-speech — Natalie voice (MP3, 24kHz) |
| dotenv | Environment variable management |

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                     CLIENT (React 19 + Vite 6)                    │
│                                                                    │
│  LoginPage ──► HomePage ──► InterviewSetupPage                   │
│                                    │                              │
│                              InterviewPage                        │
│                         (VoiceRecorder / CodeEditor)              │
│                                    │                              │
│                         FeedbackPage ◄── HistoryPage             │
└──────────────────────────┬───────────────────────────────────────┘
                           │  REST API over HTTP (Axios)
                           │  Authorization: Bearer <JWT>
┌──────────────────────────▼───────────────────────────────────────┐
│                      SERVER (Express 5 / Node.js)                 │
│                                                                    │
│  POST /api/auth/register|login   GET /api/auth/me                │
│  POST /api/resume/upload         GET  /api/resume                │
│  POST /api/interview/start                                        │
│  POST /api/interview/:id/answer|answer-audio|code|end            │
│  GET  /api/interview/:id                                          │
│  GET|DELETE /api/history[/:id]                                    │
└──────┬─────────────────┬──────────────────┬────────────────┬─────┘
       ▼                 ▼                  ▼                ▼
  MongoDB Atlas    Google Gemini       AssemblyAI         Murf AI
  (Users, Inter-   2.5 Flash           (Speech →          (Text →
   views, Resume)  (Questions &         Text)              Speech
                   Evaluation)                             MP3)
```

---

## 📁 Project Structure

```
AI-Driven-Technical-Interview-Simulation/
│
├── client/                               # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── AudioPlayer/              # Plays Murf TTS audio (base64 MP3)
│   │   │   ├── CodeEditor/               # Monaco Editor wrapper
│   │   │   ├── ConversationalMic/        # Web Speech API live transcription
│   │   │   ├── InterviewCard/            # History card component
│   │   │   ├── Navbar/                   # Top navigation bar
│   │   │   ├── ProtectedRoute/           # JWT route guard
│   │   │   ├── ScoreCard/               # Category score display
│   │   │   └── VoiceRecorder/            # MediaRecorder audio recording
│   │   ├── constants/
│   │   │   ├── difficulty.js             # Difficulty levels + question counts
│   │   │   ├── roles.js                  # Interview role definitions
│   │   │   └── scoreColors.js            # Score-to-color mapping
│   │   ├── context/
│   │   │   └── AuthContext.jsx           # Global auth state (login/logout/user)
│   │   ├── pages/
│   │   │   ├── LoginPage/                # Hero + Sign In / Create Account
│   │   │   ├── HomePage/                 # Dashboard with stats + recent history
│   │   │   ├── InterviewSetupPage/       # 3-step wizard: role → difficulty → resume
│   │   │   ├── InterviewPage/            # Live interview (voice/text/code)
│   │   │   ├── FeedbackPage/             # Detailed AI feedback + category scores
│   │   │   └── HistoryPage/              # Paginated interview history
│   │   ├── services/
│   │   │   ├── api.js                    # Axios instance with JWT interceptor
│   │   │   ├── authService.js            # register, login, getMe, logout
│   │   │   ├── historyService.js         # getHistory, deleteHistoryItem, clearHistory
│   │   │   └── interviewService.js       # upload, start, answer, code, end, get
│   │   ├── App.jsx                       # Route definitions
│   │   ├── App.css                       # Global styles
│   │   └── main.jsx                      # React entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── .env.example
│   └── package.json
│
├── server/                               # Node.js + Express backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.config.js              # MongoDB Atlas connection
│   │   │   └── gemini.config.js          # Google GenAI client (Gemini 2.5 Flash)
│   │   ├── constants/
│   │   │   └── prompts.js                # All AI prompt templates
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── resume.controller.js
│   │   │   ├── interview.controller.js   # text/voice/code answer + TTS stream
│   │   │   └── history.controller.js
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js        # JWT verification → req.user
│   │   │   ├── error.middleware.js       # 404 + global error handler
│   │   │   └── upload.middleware.js      # Multer: PDF (10MB) + audio (25MB)
│   │   ├── models/
│   │   │   ├── User.model.js
│   │   │   ├── Interview.model.js        # questions, messages, codeSubmissions, feedback
│   │   │   └── Resume.model.js
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   ├── auth.routes.js
│   │   │   ├── resume.routes.js
│   │   │   ├── interview.routes.js
│   │   │   └── history.routes.js
│   │   ├── services/
│   │   │   ├── auth.service.js
│   │   │   ├── gemini.service.js         # askGemini() wrapper
│   │   │   ├── assemblyai.service.js     # transcribeAudio() via temp file
│   │   │   ├── murf.service.js           # generateAudio() + streamAudio()
│   │   │   ├── interview.service.js      # full interview state machine
│   │   │   ├── resume.service.js         # PDF parse + upsert to DB
│   │   │   └── history.service.js        # paginated history CRUD
│   │   └── utils/
│   │       ├── jwt.utils.js              # generateToken, verifyToken
│   │       └── prompts.utils.js          # parseGeminiJSON()
│   ├── server.js                         # Entry point
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
├── .gitignore
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
