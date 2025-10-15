Smart Task Planner

An AI-powered one-page application that generates actionable project task plans using Google Gemini AI, with a React frontend, Node.js backend, and MongoDB Atlas database.
This README explains how to set up and run the project locally on Windows using PowerShell.

Video Demonstration
You can watch a full demo of how this app works here:

https://youtu.be/QaSQ79GqMes

Prerequisites

Before running the project, ensure you have installed:

Node.js (v18 or higher)

npm (comes with Node.js)

MongoDB Atlas account (or a local MongoDB instance)

Google Gemini API key

Repository Layout

frontend/   — React + CSS frontend (Create React App)

Server/     — Node.js + Express backend with MongoDB + Gemini AI integration


Quick Start (Clone & Run)
1. Clone the Repository
git clone <YOUR_REPO_URL>
cd SmartTaskPlanner

2. Install Dependencies
# Frontend
cd frontend

npm install

# Backend

cd ../Server

npm install
Environment Variables

Both backend and frontend require .env files for configuration.

Create these manually before running.

Backend (.env)

Example:

PORT=8080

MONGODB_URI=<your_mongodb_connection_string>

CLIENT_ORIGIN=http://localhost:3000

GEMINI_API_KEY=<your_gemini_api_key>

USE_MOCK=false

Frontend (.env)

Example:

REACT_APP_API_BASE=http://localhost:8080

Notes:

CLIENT_ORIGIN in the backend must match the frontend URL (http://localhost:3000).

Use USE_MOCK=true to run without a Gemini key for local testing.

Start the Backend

From the backend directory:

cd Server

npm run dev

Then open the backend health check in your browser:

http://localhost:8080/health

Expected output:

{ "ok": true }

Start the Frontend

From the frontend directory:

cd ../frontend

npm start

The app will open automatically at:

http://localhost:3000

Technologies Used

Layer	Stack

Frontend	React (CRA), Axios, Bootstrap 5, CSS

Backend	Node.js, Express.js, Morgan, CORS, dotenv

AI Engine	Google Gemini API (@google/genai)

Database	MongoDB Atlas (Mongoose ORM)

Security Notes

.env files are ignored by .gitignore.

Do not commit real API keys or credentials.

Review dependency updates carefully before deploying.

Contributing

Create a new branch.

Make your changes.

Test the app locally.

Submit a pull request for review.

Contact

For questions, setup help, or debugging assistance, please contact:

rajeshvissa12@gmail.com
