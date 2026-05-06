import clsx from "clsx";
import React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "feature" | "container";
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, variant = "default", ...props }, ref) => {
    const base =
      "group relative p-6 rounded-2xl overflow-hidden transition-all duration-300 ease-out";

    const variants = {
      default: clsx(
        "bg-white/5 backdrop-blur-xl",
        "border border-white/10",
        "shadow-[0_0_0_rgba(59,130,246,0)]",
        "hover:border-blue-400/40",
        "hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]",
        "hover:-translate-y-1",
      ),

      feature: clsx(
        "bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl",
        "border border-blue-400/20",
        "shadow-[0_0_30px_rgba(59,130,246,0.08)]",
        "hover:shadow-[0_0_70px_rgba(59,130,246,0.25)]",
        "hover:border-blue-300/50",
        "hover:-translate-y-1",
      ),

      container: clsx(
        "bg-white/5 backdrop-blur-md",
        "border border-white/10",
        "shadow-sm",
        "hover:shadow-md",
      ),
    };

    return (
      <div
        ref={ref}
        className={clsx(base, variants[variant], className)}
        {...props}
      >
        {/* 🔥 BLUE RADIAL GLOW (top light source) */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.25),transparent_70%)]" />

        {/* ✨ EDGE HIGHLIGHT (premium detail) */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent group-hover:border-blue-400/30 transition duration-300" />

        {/* ⚡ INNER LIGHT SHEEN */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition duration-500" />

        {children}
      </div>
    );
  },
);

Card.displayName = "Card";
