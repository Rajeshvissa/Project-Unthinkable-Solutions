import dotenv from "dotenv";

export function loadEnv() {
  const r = dotenv.config();
  if (r.error) console.warn("No .env found — using process env only.");

  const must = ["MONGODB_URI", "CLIENT_ORIGIN"]; // don't force LLM key if you use mock mode
  for (const key of must) {
    const val = process.env[key];
    if (!val || !val.trim()) {
      console.warn(`[ENV] Missing or empty: ${key}`);
    }
  }

  // Nice heads-up if both keys are missing and mock is off
  if (!String(process.env.USE_MOCK).toLowerCase().includes("true")) {
    if (!process.env.GEMINI_API_KEY) {
      console.warn("[ENV] GEMINI_API_KEY is missing and USE_MOCK is not true. /api/plan may fail.");
    }
  }
}
