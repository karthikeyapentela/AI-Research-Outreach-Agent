"use client";
import { motion } from "framer-motion";
import { useRef, useState, type MouseEvent, type ReactNode } from "react";

export function MagneticButton({
  children,
  variant = "primary",
  className = "",
  onClick,
}: {
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - (r.left + r.width / 2)) * 0.25,
      y: (e.clientY - (r.top + r.height / 2)) * 0.25,
    });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-b from-orange-500 to-orange-600 text-white shadow-[0_10px_40px_-10px_rgba(232,80,2,0.7)] hover:from-amber-300 hover:to-orange-600"
      : "border border-white/10 bg-white/[0.03] text-white backdrop-blur-md hover:bg-white/[0.06]";

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.2 }}
      className={`${base} ${styles} ${className}`}
    >
      {variant === "primary" && (
        <span className="pointer-events-none absolute inset-0 rounded-full bg-white/20 opacity-0 blur-xl transition-opacity duration-300 hover:opacity-100" />
      )}
      <span className="relative flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
