"use client";
import { motion } from "framer-motion";
import {
  Brain,
  Check,
  FileSearch,
  GraduationCap,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { SectionEyebrow } from "./SearchExperience";

const stages = [
  { icon: FileSearch, label: "Research", desc: "Crawl web, news, filings." },
  { icon: Brain, label: "Summarize", desc: "Distill signal from noise." },
  { icon: Mail, label: "Generate Email", desc: "Personalized outreach draft." },
  { icon: ShieldCheck, label: "Verify", desc: "Cross-check every claim." },
  { icon: GraduationCap, label: "Learn", desc: "Improve from your edits." },
];

export function Workflow() {
  return (
    <section id="workflow" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <SectionEyebrow>Workflow</SectionEyebrow>
          <h2 className="mt-4 font-display text-4xl italic text-gradient sm:text-6xl">
            A pipeline that thinks.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Five agents working in choreography — every stage transparent,
            traceable, and reversible.
          </p>
        </div>

        <div className="relative mt-20">
          {/* animated connector line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-orange-600/40 to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
            {stages.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card relative rounded-3xl p-6"
              >
                <div className="relative mb-6 flex items-center justify-between">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-orange-600/40 blur-xl" />
                    <div className="relative grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-orange-600/20 to-orange-600/10">
                      <s.icon className="h-6 w-6 text-amber-300" />
                    </div>
                  </div>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.6, type: "spring" }}
                    className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500/20 text-emerald-400"
                  >
                    <Check className="h-3.5 w-3.5" />
                  </motion.div>
                </div>
                <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground/70">
                  0{i + 1}
                </div>
                <div className="mt-1 text-lg font-medium">{s.label}</div>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>

                {/* progress bar */}
                <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.1 + 0.2 }}
                    className="h-full bg-gradient-to-r from-orange-600 to-amber-400"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
