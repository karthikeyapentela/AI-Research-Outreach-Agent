import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "research_company",
  title: "Research a company",
  description:
    "Research a company from the public web and return a structured brief: one-line summary, what they do, recent signals, and suggested angles for outreach.",
  inputSchema: {
    company: z.string().min(1).describe("Company name or website (e.g. 'Vercel' or 'vercel.com')."),
    focus: z
      .string()
      .optional()
      .describe("Optional angle to bias the research (e.g. 'hiring', 'product launches', 'funding')."),
  },
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: async ({ company, focus }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated." }], isError: true };
    }
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return {
        content: [
          {
            type: "text",
            text:
              "LOVABLE_API_KEY is not configured on the server. Ask the app owner to enable AI Gateway.",
          },
        ],
        isError: true,
      };
    }

    const prompt = `Research the company "${company}"${focus ? ` with a focus on ${focus}` : ""}.
Return a concise brief with these sections:
- Summary (one sentence)
- What they do
- Recent signals (last 6 months, bullet points)
- Suggested outreach angles (3 bullets, each specific to this company)`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are a precise B2B research analyst. Be factual and terse." },
          { role: "user", content: prompt },
        ],
      }),
    });
    if (!res.ok) {
      return {
        content: [{ type: "text", text: `Research failed (${res.status}): ${await res.text()}` }],
        isError: true,
      };
    }
    const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const text = data.choices?.[0]?.message?.content ?? "No response.";
    return { content: [{ type: "text", text }] };
  },
});
