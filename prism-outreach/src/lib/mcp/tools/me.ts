import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "me",
  title: "Who am I",
  description: "Return the currently authenticated user's id and email (from the OAuth token).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: (_input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated." }], isError: true };
    }
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            { userId: ctx.getUserId(), email: ctx.getUserEmail() ?? null },
            null,
            2,
          ),
        },
      ],
    };
  },
});
