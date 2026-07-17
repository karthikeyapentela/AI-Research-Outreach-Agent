"use client";
import { motion } from "framer-motion";
import { AIOrb } from "./AIOrb";
import { MagneticButton } from "./MagneticButton";
import { ArrowRight, Play } from "lucide-react";

const logos = ["OpenAI", "Anthropic", "Perplexity", "Sarvam AI", "BatX", "Vercel", "Linear"];

export function Hero() {
  return (
    <section id="top" className="relative pt-36 pb-20 sm:pt-44 sm:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
          </span>
          Introducing Outreach v2 — now with self-verifying research
          <ArrowRight className="h-3 w-3" />
        </motion.div>

        <div className="flex justify-center">
          <AIOrb />
        </div>

        <div className="relative -mt-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mx-auto max-w-4xl text-5xl leading-[1.05] tracking-tight sm:text-7xl"
          >
            <span className="text-gradient font-semibold">The AI agent for </span>
            <span className="font-display italic text-gradient-blue">research</span>
            <span className="text-gradient font-semibold"> and </span>
            <span className="font-display italic text-gradient-blue">outreach</span>
            <span className="text-gradient font-semibold">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            Research companies. Generate personalized outreach. Verify every
            fact. Learn from feedback. All from one calm, luminous interface.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <MagneticButton>
              Start research <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton variant="ghost">
              <Play className="h-3.5 w-3.5" /> Watch demo
            </MagneticButton>
          </motion.div>

          {/* Trust marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-20"
          >
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-muted-foreground/70">
              Trusted by GTM teams researching
            </p>
            <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
              <div className="flex w-max animate-marquee gap-16 pr-16">
                {[...logos, ...logos].map((l, i) => (
                  <span
                    key={i}
                    className="whitespace-nowrap font-display text-2xl text-muted-foreground/60"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
