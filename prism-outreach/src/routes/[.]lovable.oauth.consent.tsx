import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Beta supabase.auth.oauth namespace — local typed wrapper.
type AuthorizationDetails = {
  client?: { name?: string; redirect_uri?: string; client_uri?: string } | null;
  scope?: string;
  redirect_url?: string;
  redirect_to?: string;
};
type OAuthResult<T> = { data: T | null; error: { message: string } | null };
interface SupabaseOAuth {
  getAuthorizationDetails(id: string): Promise<OAuthResult<AuthorizationDetails>>;
  approveAuthorization(id: string): Promise<OAuthResult<AuthorizationDetails>>;
  denyAuthorization(id: string): Promise<OAuthResult<AuthorizationDetails>>;
}
const oauth = (supabase.auth as unknown as { oauth: SupabaseOAuth }).oauth;

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Missing authorization_id");
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      const next = location.pathname + location.searchStr;
      throw redirect({ to: "/auth", search: { next } });
    }
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
    if (error) throw new Error(error.message);
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl italic text-gradient">Authorization error</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {String((error as Error)?.message ?? error)}
        </p>
      </div>
    </main>
  ),
});

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function decide(approve: boolean) {
    setError(null);
    setBusy(true);
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorization_id)
      : await oauth.denyAuthorization(authorization_id);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  const clientName = details?.client?.name ?? "an app";

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-amber-300/80">Authorize</div>
          <h1 className="mt-3 font-display text-3xl italic text-gradient">
            Connect {clientName} to Outreach AI
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {clientName} will be able to call this app's enabled tools while you're signed in.
            This does not bypass this app's permissions or backend policies.
          </p>
        </div>

        {details?.client?.redirect_uri && (
          <div className="mt-6 rounded-lg border border-white/10 bg-black/30 p-4 text-xs">
            <div className="text-muted-foreground">Redirects to</div>
            <div className="mt-1 break-all font-mono text-white/90">
              {details.client.redirect_uri}
            </div>
          </div>
        )}

        <div className="mt-6 space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 text-amber-300">•</span>
            <span>Share your basic profile and email</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-0.5 text-amber-300">•</span>
            <span>Call Outreach AI tools as you</span>
          </div>
        </div>

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-400">
            {error}
          </p>
        )}

        <div className="mt-8 flex gap-3">
          <button
            disabled={busy}
            onClick={() => decide(false)}
            className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white hover:bg-white/10 disabled:opacity-60"
          >
            Cancel connection
          </button>
          <button
            disabled={busy}
            onClick={() => decide(true)}
            className="flex-1 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "Working…" : "Approve"}
          </button>
        </div>
      </div>
    </main>
  );
}
