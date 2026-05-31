"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  variant?: "default" | "hero";
  children?: ReactNode;
}

export function ScreenHeader({
  title,
  subtitle,
  variant = "default",
  children,
}: ScreenHeaderProps) {
  if (variant === "hero") {
    return (
      <div className="screen-header-hero">
        <div className="screen-header-hero__bg">
          <svg className="screen-header-hero__mountains" viewBox="0 0 400 120" preserveAspectRatio="none">
            <path d="M0 120 L60 50 L120 80 L200 30 L280 70 L340 40 L400 90 L400 120 Z" fill="rgba(255,255,255,0.12)" />
            <path d="M0 120 L100 70 L180 95 L260 55 L400 100 L400 120 Z" fill="rgba(168,213,186,0.2)" />
          </svg>
          <div className="screen-header-hero__sun" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="screen-header-hero__content"
        >
          {children}
          {title && <h1 className="screen-header-hero__title mt-3 text-center">{title}</h1>}
          {subtitle && <p className="screen-header-hero__subtitle text-center">{subtitle}</p>}
        </motion.div>
      </div>
    );
  }

  return (
    <div className={cn("screen-header", "px-5 pt-2 pb-3")}>
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-lg font-extrabold text-forest"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </motion.h1>
      {subtitle && (
        <p className="mt-1 text-center text-xs text-muted">{subtitle}</p>
      )}
    </div>
  );
}
