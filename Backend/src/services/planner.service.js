
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";

const TaskDraftSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  estimateDays: z.coerce.number().min(0).default(1),
  dependsOn: z.array(z.string()).default([])
});

const PlanSchema = z.object({
  tasks: z.array(TaskDraftSchema).min(1)
}).superRefine((plan, ctx) => {
  const seen = new Set();
  plan.tasks.forEach((t, i) => {
    if (seen.has(t.title)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["tasks", i, "title"], message: `Duplicate title "${t.title}"` });
    }
    seen.add(t.title);
    if ((t.dependsOn || []).includes(t.title)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["tasks", i, "dependsOn"], message: `Task cannot depend on itself` });
    }
  });
});

function mockPlan(goalTitle) {
  console.warn("Using MOCK plan (no LLM call)");
  return {
    tasks: [
      { title: `Define scope for: ${goalTitle}`, estimateDays: 2, dependsOn: [] },
      { title: "Design prototype", estimateDays: 3, dependsOn: [`Define scope for: ${goalTitle}`] },
      { title: "Build MVP", estimateDays: 5, dependsOn: ["Design prototype"] },
      { title: "Testing & QA", estimateDays: 2, dependsOn: ["Build MVP"] },
      { title: "Launch", estimateDays: 1, dependsOn: ["Testing & QA"] }
    ]
  };
}

function extractText(resp) {
  return resp?.text
      ?? resp?.candidates?.[0]?.content?.parts?.map(p => p.text || "").join("")
      ?? "";
}

function buildPrompt(goalTitle, targetDate) {
  return `You are an expert program manager.
Return ONLY strict JSON with this exact shape:

{
  "tasks": [
    { "title": "string", "description": "string (optional)", "estimateDays": number, "dependsOn": ["string", ...] }
  ]
}

Rules:
- Tasks must be actionable and specific.
- "estimateDays" must be realistic non-negative integers.
- "dependsOn" must reference task titles exactly.
- No extra commentary. Only JSON.

Goal: ${goalTitle}
Target date: ${targetDate || "none"}`;
}



export async function generatePlan(goalTitle, targetDate) {
  const useMock = String(process.env.USE_MOCK || "").toLowerCase() === "true";
  const gemKey = process.env.GEMINI_API_KEY;
console.log("Using mode:", useMock ? "MOCK" : "GEMINI");
  if (useMock) {
    return mockPlan(goalTitle);
  }

  if (!gemKey) {
    console.warn("GEMINI_API_KEY is missing — falling back to mock plan.");
    return mockPlan(goalTitle);
  }

  try {
    const ai = new GoogleGenAI({ apiKey: gemKey });
    const prompt = buildPrompt(goalTitle, targetDate);

    const resp = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = extractText(resp);
    let raw;
    try {
      raw = JSON.parse(text || "{}");
    } catch {
      const cleaned = text.replace(/```json|```/g, "").trim();
      raw = JSON.parse(cleaned || "{}");
    }

    const parsed = PlanSchema.safeParse(raw);
    if (!parsed.success) {
      const issues = parsed.error.issues.map(i => `${i.path.join(".")}: ${i.message}`).join("; ");
      const err = new Error("Gemini JSON failed validation: " + issues);
      err.status = 400;
      throw err;
    }

    return parsed.data;
  } catch (e) {
    console.warn("Gemini call failed — using mock. Reason:", e?.status || "", e?.message || e);
    return mockPlan(goalTitle);
  }
}



