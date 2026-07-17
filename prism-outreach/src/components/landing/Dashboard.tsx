"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Building2,
  Copy,
  Download,
  Lightbulb,
  Newspaper,
  Package,
  RefreshCw,
  Target,
} from "lucide-react";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { SectionEyebrow } from "./SearchExperience";

function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 20 });
  const sy = useSpring(my, { stiffness: 200, damping: 20 });
  const rx = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const ry = useTransform(sx, [-0.5, 0.5], [-6, 6]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`glass-card relative rounded-3xl p-6 transition-shadow duration-500 hover:shadow-[0_30px_80px_-30px_rgba(232,80,2,0.6)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.06] to-transparent" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

function CardHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 rounded-xl bg-orange-600/30 blur-lg" />
        <div className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-orange-600/20 to-orange-600/10">
          <Icon className="h-5 w-5 text-amber-300" />
        </div>
      </div>
      <div>
        <div className="text-sm font-medium">{title}</div>
        {subtitle && (
          <div className="text-xs text-muted-foreground">{subtitle}</div>
        )}
      </div>
    </div>
  );
}

const emailLines = [
  "Hi Priya —",
  "",
  "I noticed BatX just closed your Series A and announced the Bengaluru gigafactory (congrats).",
  "",
  "With cell chemistry moving toward LFP at scale, GTM teams like yours usually need faster",
  "buyer research to keep pace with the OEM pipeline you're courting.",
  "",
  "We built Outreach for exactly this — 15 min → 15 seconds per account.",
  "",
  "Worth a quick look next Tuesday?",
  "",
  "— Alex",
];

function EmailCard() {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setVisible((v) => (v >= emailLines.length ? 0 : v + 1)), 350);
    return () => clearInterval(id);
  }, []);

  return (
    <TiltCard className="lg:col-span-2">
      <div className="flex items-center justify-between">
        <CardHeader icon={Building2} title="Generated Email" subtitle="Draft • v3" />
        <div className="flex items-center gap-1">
          {[Copy, RefreshCw, Download].map((I, i) => (
            <button
              key={i}
              className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:text-white"
            >
              <I className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
      </div>
      <div className="mt-2 rounded-2xl border border-white/5 bg-neutral-950/50 p-5 font-mono text-[13px] leading-relaxed text-slate-200">
        <div className="mb-3 flex items-center justify-between border-b border-white/5 pb-2 text-[11px] text-muted-foreground">
          <span>To: priya@batx.energy</span>
          <span>Subject: Faster account research for BatX GTM</span>
        </div>
        <div className="min-h-[220px]">
          {emailLines.slice(0, visible).map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={l === "" ? "h-3" : ""}
            >
              {l || "\u00A0"}
              {i === visible - 1 && l !== "" && (
                <span className="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 animate-pulse bg-orange-500" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </TiltCard>
  );
}

function VerificationCard() {
  const score = 9.4;
  const pct = score / 10;
  const dash = 283 * (1 - pct);
  return (
    <TiltCard>
      <CardHeader
        icon={Target}
        title="Verification Score"
        subtitle="Cross-checked · 24 sources"
      />
      <div className="flex flex-col items-center py-2">
        <div className="relative h-40 w-40">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="6"
              fill="none"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#g)"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="283"
              initial={{ strokeDashoffset: 283 }}
              whileInView={{ strokeDashoffset: dash }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            />
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="font-display text-4xl italic text-white">{score}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                / 10 confidence
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Ready to send · no human review required
        </div>
      </div>
    </TiltCard>
  );
}

export function Dashboard() {
  return (
    <section id="dashboard" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <SectionEyebrow>Dashboard Preview</SectionEyebrow>
          <h2 className="mt-4 font-display text-4xl italic text-gradient sm:text-6xl">
            One glance. Every signal.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Floating glass cards surface the story of every account —
            beautifully arranged, endlessly explorable.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <TiltCard>
            <CardHeader icon={Building2} title="Company Summary" subtitle="OpenAI · San Francisco" />
            <p className="text-sm text-muted-foreground">
              Frontier AI lab building safe general-purpose systems. Enterprise
              arm ($3.4B ARR) leads current growth, powered by ChatGPT
              Enterprise and API platform.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["Series G", "AGI Research", "Platform", "770 employees"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          </TiltCard>

          <TiltCard>
            <CardHeader icon={Newspaper} title="Recent News" />
            <ul className="space-y-3 text-sm">
              {[
                { d: "2d", t: "Announces enterprise fine-tuning tier" },
                { d: "5d", t: "Signs $200M compute pact with Oracle" },
                { d: "1w", t: "Ships GPT-5.1 to ChatGPT Team" },
              ].map((n) => (
                <li key={n.t} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500 shadow-[0_0_10px_2px_rgba(232,80,2,0.6)]" />
                  <div>
                    <div className="text-slate-200">{n.t}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {n.d} ago
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </TiltCard>

          <TiltCard>
            <CardHeader icon={Package} title="Products & Services" />
            <div className="grid grid-cols-2 gap-2 text-xs">
              {["ChatGPT Enterprise", "API Platform", "GPT Store", "Assistants API", "Realtime", "Fine-tuning"].map((p) => (
                <div
                  key={p}
                  className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-slate-200"
                >
                  {p}
                </div>
              ))}
            </div>
          </TiltCard>

          <TiltCard>
            <CardHeader icon={Lightbulb} title="Personalization Hook" />
            <blockquote className="border-l-2 border-orange-500/60 pl-4 text-sm italic text-slate-200">
              "Priya's team just closed Series A and is scaling a GTM function
              for OEM buyers — perfect moment for a research copilot."
            </blockquote>
          </TiltCard>

          <TiltCard>
            <CardHeader icon={Target} title="Pain Points" />
            <ul className="space-y-2 text-sm text-slate-200">
              {[
                "Manual account research (15+ min per lead)",
                "GTM hiring outpacing enablement",
                "Fragmented buyer intelligence tools",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-orange-500" />
                  {p}
                </li>
              ))}
            </ul>
          </TiltCard>

          <VerificationCard />
          <EmailCard />
        </div>
      </div>
    </section>
  );
}
