"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionEyebrow } from "./SearchExperience";
import { MagneticButton } from "./MagneticButton";

const tiers = [
  {
    name: "Starter",
    price: "0",
    period: "/mo",
    tagline: "For solo founders exploring Outreach.",
    features: [
      "50 researches / month",
      "25 outreach drafts",
      "Community verification",
      "Chrome + web app",
    ],
    cta: "Start free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "49",
    period: "/mo",
    tagline: "For operators shipping outreach daily.",
    features: [
      "Unlimited research",
      "Unlimited drafts",
      "Verification score + citations",
      "Personal memory + tone learning",
      "CRM sync (HubSpot, Attio, Salesforce)",
    ],
    cta: "Start 14-day trial",
    highlighted: true,
  },
  {
    name: "Team",
    price: "Custom",
    period: "",
    tagline: "For GTM teams standardizing quality.",
    features: [
      "Everything in Pro",
      "Shared team memory",
      "Voice + brand controls",
      "SSO, SCIM, audit logs",
      "Dedicated success partner",
    ],
    cta: "Talk to sales",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <SectionEyebrow>Pricing</SectionEyebrow>
          <h2 className="mt-4 font-display text-4xl italic text-gradient sm:text-6xl">
            Simple. Honest. Fast to try.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-3xl p-8 ${
                t.highlighted
                  ? "border border-orange-500/30 bg-gradient-to-b from-orange-600/[0.08] to-white/[0.02] shadow-[0_30px_100px_-30px_rgba(232,80,2,0.5)]"
                  : "glass-card"
              }`}
            >
              {t.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-600 to-orange-600 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white">
                  Most popular
                </div>
              )}
              <div className="text-sm text-muted-foreground">{t.name}</div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-5xl italic text-white">
                  {t.price === "Custom" ? "Custom" : `$${t.price}`}
                </span>
                <span className="text-sm text-muted-foreground">{t.period}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{t.tagline}</p>

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-orange-600/20">
                      <Check className="h-2.5 w-2.5 text-amber-300" />
                    </span>
                    <span className="text-slate-200">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <MagneticButton
                  variant={t.highlighted ? "primary" : "ghost"}
                  className="w-full"
                >
                  {t.cta}
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
