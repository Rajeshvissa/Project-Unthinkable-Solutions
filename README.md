Smart Task Planner

An AI-powered single-page application that generates structured, actionable project task plans using Google Gemini AI, with a React frontend, Node.js backend, and MongoDB Atlas database.

This README provides setup and execution details for running the project locally on Windows using PowerShell.

Video Demonstration

You can watch the full demo of this application here:

https://youtu.be/QaSQ79GqMes

Prerequisites

Ensure you have the following installed on your system:

Node.js (version 18 or higher)

npm (comes with Node.js)

MongoDB Atlas account or a local MongoDB instance

Google Gemini API key

Repository Layout

frontend/   — React + CSS frontend (Create React App)

Server/     — Node.js + Express backend with MongoDB + Gemini AI integration

# Quick Start (Clone & Run)
# 1. Clone the Repository
git clone <YOUR_REPO_URL>
cd SmartTaskPlanner

# 2. Install Dependencies
cd frontend
npm install

cd ../Server
npm install

# Environment Variables

Both backend and frontend use .env files for configuration.

You must create these files manually before running the application.

# Backend (.env)
PORT=8080

MONGODB_URI=<your_mongodb_connection_string>

CLIENT_ORIGIN=http://localhost:3000

GEMINI_API_KEY=<your_gemini_api_key>

USE_MOCK=false

# Frontend (.env)
REACT_APP_API_BASE=http://localhost:8080


Important Notes:

The CLIENT_ORIGIN value in the backend must match the frontend URL (http://localhost:3000).

You can set USE_MOCK=true to test locally without a Gemini API key.

# Start the Backend
cd Server

npm run dev


Access backend health status:
http://localhost:8080/health

Expected output:
{ "ok": true }

# Start the Frontend
cd ../frontend

npm start


Access the app in your browser:
http://localhost:3000

# Application Flow (Frontend → Backend → AI → Database)

The user enters a goal (for example: “Launch MVP”) in the input field.

The React frontend sends a POST request to:

http://localhost:8080/api/plan


The Express backend:

Creates a structured prompt for Gemini AI.

Receives an AI-generated JSON list of tasks.

Validates and cleans data using Zod.

Saves the goal and associated tasks in MongoDB Atlas.

The backend sends the response containing validated tasks.

The frontend renders:

A list of tasks with descriptions and estimated durations.

A visually styled timeline for better understanding of the workflow.

# Data Model Summary

Goal
{
  "title": "Launch MVP",
  "createdAt": "2025-10-15T10:08:16.834Z"
}

Task
{
  "goalId": "<Goal _id>",
  "title": "Design prototype",
  "description": "Wireframe and design screens",
  "estimateDays": 3,
  "dependsOn": ["<another_task_id>"],
  "startDate": "2025-10-17T10:08:16.831Z",
  "endDate": "2025-10-20T10:08:16.831Z",
  "status": "todo"
}

# Technologies Used

Layer	Stack

Frontend	React (Create React App), Axios, Bootstrap 5, CSS

Backend	Node.js, Express.js, Morgan, CORS, dotenv

AI Engine	Google Gemini API (@google/genai)

Database	MongoDB Atlas (Mongoose ORM)

# Testing API Endpoints
Check Backend Status

curl http://localhost:8080/health

Generate a Task Plan
curl -X POST http://localhost:8080/api/plan \
  -H "Content-Type: application/json" \
  -d "{\"goalTitle\":\"Launch MVP\"}"

# Troubleshooting

Backend fails to connect to MongoDB

Ensure that .env includes a valid MONGODB_URI.

CORS error (frontend cannot reach backend)

Verify that:

CLIENT_ORIGIN=http://localhost:3000

REACT_APP_API_BASE=http://localhost:8080


Invalid Gemini API Key

Confirm your Gemini API key in Google AI Studio and regenerate it if necessary.

# Security Notes

.env files are ignored by .gitignore.

Never commit API keys or database credentials.

Review dependency updates carefully before deploying the project.

# Contributing

Create a new branch.

Make your updates or fixes.

Test thoroughly on your local environment.

Submit a pull request for review.

# Contact

For setup assistance or project-related queries, reach out via email:

rajeshvissa12@gmail.com
