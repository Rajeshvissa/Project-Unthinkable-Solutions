import { loadEnv } from "./config/env.js";
loadEnv();
const gem = process.env.GEMINI_API_KEY || "";
console.log("Gemini key loaded:", gem ? `len=${gem.length}` : "missing");

import app from "./app.js";
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 8080;

(async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
})();

