"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionEyebrow } from "./SearchExperience";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref} className="font-display text-5xl italic text-gradient-blue">
      {to >= 1000 ? Math.round(v).toLocaleString() : v.toFixed(to % 1 ? 1 : 0)}
      {suffix}
    </span>
  );
}

const line = Array.from({ length: 12 }).map((_, i) => ({
  m: i,
  v: 20 + Math.round(30 * Math.sin(i / 2) + i * 6 + Math.random() * 6),
}));
const area = Array.from({ length: 12 }).map((_, i) => ({
  m: i,
  a: 60 + Math.round(20 * Math.sin(i / 3) + i * 2),
}));

export function Analytics() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <SectionEyebrow>Analytics</SectionEyebrow>
          <h2 className="mt-4 font-display text-4xl italic text-gradient sm:text-6xl">
            Proof, in real numbers.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Every research pass, every send, every reply — instrumented,
            so you can see the compounding.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Companies researched", val: 12420, suf: "" },
            { label: "Emails generated", val: 38210, suf: "" },
            { label: "Average confidence", val: 9.3, suf: "" },
            { label: "Reply rate lift", val: 3.8, suf: "×" },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-6">
              <Counter to={s.val} suffix={s.suf} />
              <div className="mt-2 text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="glass-card rounded-3xl p-6">
            <div className="mb-4 flex items-baseline justify-between">
              <div>
                <div className="text-sm font-medium">Emails sent</div>
                <div className="text-xs text-muted-foreground">Last 12 weeks</div>
              </div>
              <div className="text-xs text-emerald-300">▲ 42%</div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={line}>
                  <defs>
                    <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F16001" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#F16001" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="m" hide />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(2,6,23,0.9)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 12,
                      color: "white",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="#F16001"
                    strokeWidth={2}
                    fill="url(#ga)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <div className="mb-4 flex items-baseline justify-between">
              <div>
                <div className="text-sm font-medium">Verification confidence</div>
                <div className="text-xs text-muted-foreground">Rolling avg</div>
              </div>
              <div className="text-xs text-amber-300">9.3 / 10</div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={area}>
                  <XAxis dataKey="m" hide />
                  <YAxis hide domain={[40, 100]} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(2,6,23,0.9)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 12,
                      color: "white",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="a"
                    stroke="#a78bfa"
                    strokeWidth={2}
                    dot={{ fill: "#a78bfa", r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
