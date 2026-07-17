"use client";

import { motion } from "framer-motion";
import { Mic, Search, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const examples = [
  "OpenAI",
  "Sarvam AI",
  "BatX Energies",
  "Perplexity",
  "Anthropic",
];

interface ResearchResult {
  success: boolean;
  summary?: string;
  email?: string;
  verification?: {
    confidence_score?: number;
    reason?: string;
    human_review_required?: boolean;
  };
}

export function SearchExperience() {
  const [focused, setFocused] = useState(false);
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [company, setCompany] = useState("");

  const [result, setResult] =
    useState<ResearchResult | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const target = examples[i];

    let n = 0;
    setText("");

    const tick = setInterval(() => {
      n++;

      setText(target.slice(0, n));

      if (n >= target.length) {
        clearInterval(tick);

        setTimeout(() => {
          setI((v) => (v + 1) % examples.length);
        }, 1600);
      }
    }, 90);

    return () => clearInterval(tick);
  }, [i]);

  async function handleResearch(
    companyName = company.trim() || examples[i]
  ) {
    const trimmed = companyName.trim();

    if (!trimmed) {
      setError("Type a company name.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        "/api/research",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            company: trimmed,
            focus: "outreach",
          }),
        }
      );

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(
          payload.error ??
            "Research request failed."
        );
      }

      setResult(payload);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Research failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="features"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-6 text-center">
        <SectionEyebrow>
          Search Experience
        </SectionEyebrow>

        <h2 className="mt-4 font-display text-4xl italic text-gradient sm:text-6xl">
          Ask about any company.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          AI-powered research and
          personalized outreach in
          seconds.
        </p>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "-100px",
          }}
          transition={{
            duration: 0.7,
          }}
          className="relative mx-auto mt-12 max-w-3xl"
        >
          <div
            className={`absolute -inset-2 rounded-3xl bg-gradient-to-r from-orange-600/40 via-orange-600/40 to-amber-500/40 opacity-0 blur-2xl transition-opacity duration-500 ${
              focused
                ? "opacity-100"
                : ""
            }`}
          />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void handleResearch();
            }}
            className={`relative flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-xl transition-all duration-500 ${
              focused
                ? "border-orange-500/40 shadow-[0_20px_60px_-20px_rgba(232,80,2,0.6)]"
                : ""
            }`}
          >
            <Search className="h-5 w-5 shrink-0 text-amber-300" />

            <input
              value={company}
              onChange={(e) =>
                setCompany(
                  e.target.value
                )
              }
              onFocus={() =>
                setFocused(true)
              }
              onBlur={() =>
                setFocused(false)
              }
              placeholder={`Research any company — try "${text}"`}
              className="flex-1 bg-transparent text-left text-base text-white placeholder:text-muted-foreground/80 focus:outline-none"
            />

            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-muted-foreground"
            >
              <Mic className="h-4 w-4" />
            </button>

            <button
              type="submit"
              disabled={loading}
              className="hidden items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-medium text-neutral-950 disabled:opacity-60 sm:inline-flex"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {loading
                ? "Researching..."
                : "Research"}
            </button>
          </form>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {examples.map((e, idx) => (
              <button
                key={e}
                onClick={() => {
                  setCompany(e);
                  setI(idx);
                  void handleResearch(
                    e
                  );
                }}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground transition-all hover:border-orange-500/40 hover:text-white"
              >
                {e}
              </button>
            ))}
          </div>

          {error && (
            <p className="mt-5 text-red-400">
              {error}
            </p>
          )}

          {loading && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center text-white">
              🔍 Researching company...
            </div>
          )}

          {result && (
            <div className="mt-8 space-y-6 text-left">

              {/* Summary */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Company Summary
                </h3>

                <pre className="whitespace-pre-wrap text-sm text-gray-300">
                  {result.summary}
                </pre>
              </div>

              {/* Email */}
              <div className="rounded-3xl border border-orange-500/20 bg-orange-500/5 p-6 backdrop-blur-xl">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Outreach Email
                </h3>

                <p className="whitespace-pre-wrap text-gray-300">
                  {result.email}
                </p>
              </div>

              {/* Verification */}
              <div className="rounded-3xl border border-green-500/20 bg-green-500/5 p-6 backdrop-blur-xl">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Verification
                </h3>

                <p className="text-green-400 font-semibold">
                  Confidence Score:{" "}
                  {
                    result.verification
                      ?.confidence_score
                  }
                  /10
                </p>

                <p className="mt-3 text-gray-300">
                  {
                    result.verification
                      ?.reason
                  }
                </p>

                <p className="mt-4 text-sm text-gray-400">
                  {result.verification
                    ?.human_review_required
                    ? "Human Review Required"
                    : "Email Ready"}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export function SectionEyebrow({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.2em] text-amber-300/80">
      {children}
    </div>
  );
}