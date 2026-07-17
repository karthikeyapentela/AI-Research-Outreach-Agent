import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const researchRequestSchema = z.object({
  company: z.string().trim().min(1),
  focus: z.string().trim().optional(),
});

const pythonApiResponseSchema = z.object({
  success: z.boolean(),
  summary: z.string().optional(),
  email: z.string().optional(),
  verification: z
    .object({
      confidence_score: z.union([z.number(), z.string()]).optional(),
      reason: z.string().optional(),
      human_review_required: z.boolean().optional(),
    })
    .optional(),
  message: z.string().optional(),
});

export const Route = createFileRoute("/api/research")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as unknown;

          const parsed = researchRequestSchema.safeParse(body);

          if (!parsed.success) {
            return Response.json(
              {
                error: "Please provide a company name to research.",
              },
              {
                status: 400,
              },
            );
          }

          const { company, focus } = parsed.data;

          const pythonApiUrl =
            process.env.PYTHON_API_URL ??
            "http://127.0.0.1:8000";

          try {
            const response = await fetch(
              `${pythonApiUrl.replace(/\/$/, "")}/research`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  company_name: company,
                  focus,
                }),
              },
            );

            const rawPayload =
              (await response.json()) as unknown;

            const payload =
              pythonApiResponseSchema.parse(rawPayload);

            if (!response.ok || !payload.success) {
              console.error(
                `Python research call failed (${response.status}): ${
                  payload.message ??
                  "No details returned."
                }`,
              );

              return Response.json(
                {
                  error:
                    payload.message ??
                    "Python backend research request failed.",
                },
                {
                  status: response.ok
                    ? 400
                    : response.status,
                },
              );
            }

            return Response.json(
              {
                success: true,
                summary: payload.summary,
                email: payload.email,
                verification:
                  payload.verification,
              },
              {
                status: 200,
              },
            );
          } catch (error) {
            console.error(
              "Python research route error",
              error,
            );

            return Response.json(
              {
                error:
                  "Could not reach the Python backend. Start it with: uvicorn api:app --reload --port 8000",
              },
              {
                status: 502,
              },
            );
          }
        } catch (error) {
          console.error(
            "Research route error",
            error,
          );

          return Response.json(
            {
              error:
                "Backend research request failed.",
            },
            {
              status: 500,
            },
          );
        }
      },
    },
  },
});