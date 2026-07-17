import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "draft_outreach_email",
  title: "Draft an outreach email",
  description:
    "Generate a personalized cold outreach email to a specific person at a specific company, in a chosen tone.",
  inputSchema: {
    company: z.string().min(1).describe("Target company name."),
    recipient: z.string().min(1).describe("Recipient name and role (e.g. 'Andreas, Head of DevRel')."),
    goal: z.string().min(1).describe("What you want from this outreach (meeting, feedback, intro, etc.)."),
    tone: z
      .enum(["dry", "warm", "direct", "playful"])
      .default("direct")
      .describe("Tone of the email."),
    context: z.string().optional().describe("Any extra context or angle to reference."),
  },
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: async ({ company, recipient, goal, tone, context }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated." }], isError: true };
    }
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { content: [{ type: "text", text: "LOVABLE_API_KEY is not configured." }], isError: true };
    }

    const prompt = `Write a cold outreach email.
Company: ${company}
Recipient: ${recipient}
Goal: ${goal}
Tone: ${tone}
${context ? `Extra context: ${context}` : ""}

Rules:
- Under 120 words
- One concrete, specific hook tied to the company
- One clear ask, in the last line
- No generic flattery, no "I hope this finds you well"
Return: subject line on the first line, then a blank line, then the body.`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You write sharp, human-sounding outreach. No filler." },
          { role: "user", content: prompt },
        ],
      }),
    });
    if (!res.ok) {
      return {
        content: [{ type: "text", text: `Draft failed (${res.status}): ${await res.text()}` }],
        isError: true,
      };
    }
    const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const text = data.choices?.[0]?.message?.content ?? "No response.";
    return { content: [{ type: "text", text }] };
  },
});
