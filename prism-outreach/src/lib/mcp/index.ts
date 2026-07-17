import { auth, defineMcp } from "@lovable.dev/mcp-js";
import researchCompany from "./tools/research-company";
import draftOutreachEmail from "./tools/draft-outreach-email";
import me from "./tools/me";

// The OAuth issuer MUST be the direct Supabase host, never the .lovable.cloud
// proxy — mcp-js verifies the token against the issuer from OpenID discovery.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "outreach-ai-mcp",
  title: "Outreach AI",
  version: "0.1.0",
  instructions:
    "Tools for the Outreach AI agent. Use `research_company` to brief any company from public web sources, `draft_outreach_email` to write a personalized cold email, and `me` to check the signed-in identity.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [researchCompany, draftOutreachEmail, me],
});
