// src/app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";

import planRoutes from "./routes/plan.routes.js";
import goalsRoutes from "./routes/goals.routes.js";

const app = express();

/** -------------------------------------------------------
 * CORS (dev-friendly, with preflight handling)
 * ------------------------------------------------------*/
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:3000")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    // allow same-origin / curl / postman with no Origin header
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS: " + origin));
  },
  methods: ["GET", "HEAD", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// (optional) log preflights so you can see the browser origin
app.use((req, _res, next) => {
  if (req.method === "OPTIONS") {
    console.log("Preflight from:", req.headers.origin, "to", req.originalUrl);
  }
  next();
});

app.use(cors(corsOptions));
// respond to preflight for every path
app.options("*", cors(corsOptions));

/** -------------------------------------------------------
 * Middleware & routes
 * ------------------------------------------------------*/
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api", planRoutes);
app.use("/api", goalsRoutes);

/** -------------------------------------------------------
 * Error handler (last)
 * ------------------------------------------------------*/
app.use((err, _req, res, _next) => {
  console.error("ERR:", err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Internal Server Error",
    details: err.details,
  });
});

export default app;
