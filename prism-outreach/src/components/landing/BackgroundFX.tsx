"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export function BackgroundFX() {
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 100);
      my.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const bg = useTransform(
    [sx, sy],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}% ${y}%, rgba(232,80,2,0.18), transparent 40%), radial-gradient(900px circle at ${100 - (x as number)}% ${100 - (y as number)}%, rgba(193,8,1,0.12), transparent 45%)`,
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* deep base */}
      <div className="absolute inset-0" style={{ background: "#0D0D0D" }} />

      {/* mesh gradient */}
      <div className="absolute inset-0 opacity-70">
        <div className="absolute -top-40 left-1/3 h-[600px] w-[600px] rounded-full bg-orange-600/20 blur-[120px] animate-pulse-glow" />
        <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-orange-600/15 blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[120px] animate-pulse-glow" style={{ animationDelay: "4s" }} />
      </div>

      {/* mouse spotlight */}
      <motion.div className="absolute inset-0" style={{ background: bg }} />

      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent 80%)",
        }}
      />

      {/* stars */}
      <Stars />

      {/* noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
    </div>
  );
}

function Stars() {
  const stars = Array.from({ length: 60 }, (_, i) => i);
  return (
    <div className="absolute inset-0">
      {stars.map((i) => {
        const top = (i * 37) % 100;
        const left = (i * 53) % 100;
        const size = (i % 3) + 1;
        const delay = (i % 10) * 0.3;
        return (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse-glow"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: size,
              height: size,
              opacity: 0.5,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
