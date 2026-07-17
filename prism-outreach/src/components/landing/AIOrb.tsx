"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function AIOrb() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const rx = useTransform(sy, [-1, 1], [15, -15]);
  const ry = useTransform(sx, [-1, 1], [-15, 15]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      mx.set(Math.max(-1, Math.min(1, (e.clientX - cx) / 400)));
      my.set(Math.max(-1, Math.min(1, (e.clientY - cy) / 400)));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div ref={ref} className="relative mx-auto flex h-[340px] w-[340px] items-center justify-center sm:h-[420px] sm:w-[420px]">
      {/* outer glow */}
      <div className="absolute inset-0 rounded-full bg-orange-600/30 blur-[80px] animate-pulse-glow" />
      <div className="absolute inset-4 rounded-full bg-orange-600/20 blur-[60px]" />

      {/* rotating rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 rounded-full border border-orange-500/30" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_20px_5px_rgba(232,80,2,0.7)]" />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-6"
      >
        <div className="absolute inset-0 rounded-full border border-amber-400/20" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_20px_5px_rgba(232,80,2,0.7)]" />
      </motion.div>

      {/* orb body */}
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
        className="relative h-[240px] w-[240px] rounded-full sm:h-[300px] sm:w-[300px]"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, #FFE0B2 0%, #F16001 25%, #C10801 55%, #0D0D0D 100%)",
            boxShadow:
              "inset -30px -30px 60px rgba(0,0,0,0.55), inset 20px 20px 60px rgba(232,80,2,0.35), 0 0 100px rgba(232,80,2,0.5)",
          }}
        >
          {/* highlight */}
          <div className="absolute left-[18%] top-[14%] h-16 w-24 rounded-full bg-white/60 blur-2xl" />
          {/* inner shimmer */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full opacity-40"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, rgba(232,80,2,0.6), transparent 40%)",
              mixBlendMode: "screen",
            }}
          />
        </motion.div>
      </motion.div>

      {/* orbiting particles */}
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        const radius = 180 + (i % 3) * 20;
        return (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-amber-300"
            style={{
              boxShadow: "0 0 8px 2px rgba(232,80,2,0.8)",
            }}
            animate={{
              x: [Math.cos(angle) * radius, Math.cos(angle + Math.PI * 2) * radius],
              y: [Math.sin(angle) * radius, Math.sin(angle + Math.PI * 2) * radius],
            }}
            transition={{
              duration: 12 + (i % 4) * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.2,
            }}
          />
        );
      })}
    </div>
  );
}
