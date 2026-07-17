"use client";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Demo", href: "#dashboard" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const blur = useTransform(scrollY, [0, 100], [8, 24]);

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 20));
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <motion.nav
        style={{ backdropFilter: `blur(${blur.get()}px)` }}
        className={`flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 ${
          scrolled
            ? "border-white/10 bg-neutral-950/70 shadow-[0_10px_40px_-10px_rgba(232,80,2,0.35)]"
            : "border-white/5 bg-white/[0.02]"
        }`}
      >
        <a href="#top" className="flex items-center gap-2 pl-2">
          <div className="relative">
            <div className="absolute inset-0 rounded-md bg-orange-600 blur-md opacity-70" />
            <div className="relative flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-orange-500 to-orange-700">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </div>
          <span className="text-sm font-semibold tracking-tight">
            Outreach<span className="text-muted-foreground">.ai</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/auth"
            className="hidden rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-white sm:block"
          >
            Sign in
          </Link>
          <Link
            to="/auth"
            search={{ next: "/" }}
            className="relative rounded-full bg-white px-4 py-1.5 text-sm font-medium text-neutral-950 transition-transform hover:scale-[1.03]"
          >
            Get started
          </Link>
        </div>
      </motion.nav>
    </motion.header>
  );
}
