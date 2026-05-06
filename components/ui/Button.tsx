import clsx from "clsx";
import { motion, type HTMLMotionProps } from "framer-motion";
import React from "react";

type ButtonProps = Omit<HTMLMotionProps<"button">, "onDrag"> & {
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
  children?: React.ReactNode; // 🔥 force correct type
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant = "primary", loading = false, className, ...props },
    ref,
  ) => {
    const base =
      "relative inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-2xl transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

    const variants = {
      primary: clsx(
        "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
        "shadow-[0_0_20px_rgba(59,130,246,0.4)]",
        "hover:shadow-[0_0_40px_rgba(59,130,246,0.7)]",
        "hover:from-blue-400 hover:to-blue-500",
        "focus:ring-blue-400",
      ),

      secondary: clsx(
        "bg-neutral-100 text-neutral-900",
        "hover:bg-neutral-200",
        "shadow-sm hover:shadow-md",
        "focus:ring-neutral-400",
      ),

      ghost: clsx(
        "bg-transparent text-neutral-200",
        "border border-white/10",
        "hover:bg-white/5",
        "focus:ring-white/20",
      ),
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.96 }}
        whileHover={{ y: -2 }}
        className={clsx(base, variants[variant], className)}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}

        <span className={clsx(loading && "opacity-80")}>
          {children as React.ReactNode}
        </span>
      </motion.button>
    );
  },
);

Button.displayName = "Button";
