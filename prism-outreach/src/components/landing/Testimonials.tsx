"use client";
import { motion } from "framer-motion";
import { SectionEyebrow } from "./SearchExperience";

const quotes = [
  {
    quote:
      "Feels like the Arc Browser of sales research. The research-to-send loop is genuinely magical — and the verification score means I finally trust the drafts.",
    author: "Maya Chen",
    role: "Head of Growth, Northwind",
  },
  {
    quote:
      "We replaced three tools with Outreach. Our SDRs now open 30 accounts a day instead of 6, with better first lines than the ones I used to write by hand.",
    author: "Andreas Weber",
    role: "VP Sales, Kinetic Labs",
  },
  {
    quote:
      "The learning loop is the killer feature. By month two Outreach sounds more like me than my own drafts.",
    author: "Priya Rao",
    role: "Founder, Loop.io",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <SectionEyebrow>Loved by GTM teams</SectionEyebrow>
          <h2 className="mt-4 font-display text-4xl italic text-gradient sm:text-6xl">
            Signal beats volume.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {quotes.map((q, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card relative flex flex-col justify-between rounded-3xl p-7"
            >
              <p className="text-slate-200">{q.quote}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-orange-600 to-orange-600 text-sm font-semibold">
                  {q.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-medium">{q.author}</div>
                  <div className="text-xs text-muted-foreground">{q.role}</div>
                </div>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
