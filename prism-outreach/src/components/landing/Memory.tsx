"use client";
import { motion } from "framer-motion";
import { CheckCircle2, MessageSquare, Sparkles } from "lucide-react";
import { SectionEyebrow } from "./SearchExperience";

const events = [
  {
    icon: CheckCircle2,
    title: "Good email — kept as-is",
    detail:
      "Vercel outreach to Andreas · opened + replied within 12 minutes.",
    tag: "Signal",
    time: "2h ago",
  },
  {
    icon: MessageSquare,
    title: "You corrected the tone",
    detail:
      "\"Too enthusiastic. Match Linear's dry precision.\" — logged in style profile.",
    tag: "Correction",
    time: "Yesterday",
  },
  {
    icon: Sparkles,
    title: "Learned: reference the podcast, not the pitch deck",
    detail:
      "Applied to 12 upcoming founder-tier accounts.",
    tag: "Learning",
    time: "3d ago",
  },
  {
    icon: CheckCircle2,
    title: "Good email — kept as-is",
    detail: "Sarvam AI intro to Vivek · 3 rounds of context, one send.",
    tag: "Signal",
    time: "1w ago",
  },
];

export function Memory() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <SectionEyebrow>Memory</SectionEyebrow>
          <h2 className="mt-4 font-display text-4xl italic text-gradient sm:text-6xl">
            An agent that remembers.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Every edit, every correction, every "send anyway" becomes context.
            Outreach sounds more like you with every conversation.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-orange-600/40 to-transparent md:left-1/2" />

          <div className="space-y-6">
            {events.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex items-start gap-6 md:w-1/2 ${
                  i % 2 === 1 ? "md:ml-auto md:pl-12" : "md:pr-12"
                }`}
              >
                <div className="relative z-10 mt-2 grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-neutral-950/80 backdrop-blur-md md:absolute md:left-auto md:right-auto md:top-2 md:mt-0" style={{ [i % 2 === 1 ? 'left' : 'right']: 'calc(100% - 24px)' } as any}>
                  <div className="absolute inset-0 rounded-2xl bg-orange-600/30 blur-lg" />
                  <e.icon className="relative h-5 w-5 text-amber-300" />
                </div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass-card w-full rounded-2xl p-5"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-widest text-amber-300">
                      {e.tag}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{e.time}</span>
                  </div>
                  <div className="text-sm font-medium">{e.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{e.detail}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
