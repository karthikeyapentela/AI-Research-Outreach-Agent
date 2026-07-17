"use client";
import { Sparkles } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer id="contact" className="relative pt-24 pb-10">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-4xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-10 text-center sm:p-16"
        >
          <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-orange-600/40 blur-[120px]" />
          <div className="pointer-events-none absolute inset-0 opacity-20" style={{ background: "radial-gradient(ellipse at center, transparent 40%, #0D0D0D 80%)" }} />

          <h2 className="relative font-display text-4xl italic text-gradient sm:text-6xl">
            Research at the speed of thought.
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-muted-foreground">
            Join the private beta and watch your account research collapse from
            hours into seconds.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <MagneticButton>
              Start research <Sparkles className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton variant="ghost">Talk to founders</MagneticButton>
          </div>
        </motion.div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 rounded-md bg-orange-600 blur-md opacity-70" />
              <div className="relative flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-orange-500 to-orange-700">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </div>
            </div>
            <span className="text-sm font-semibold">Outreach.ai</span>
            <span className="ml-3 text-xs text-muted-foreground">
              © {new Date().getFullYear()} Outreach Labs Inc.
            </span>
          </div>
          <div className="flex flex-wrap gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <a href="#" className="hover:text-white">
              Security
            </a>
            <a href="#" className="hover:text-white">
              Changelog
            </a>
            <a href="#" className="hover:text-white">
              hello@lumen.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
