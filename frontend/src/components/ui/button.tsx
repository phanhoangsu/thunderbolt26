import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "gold" | "outline";
  size?: "default" | "sm";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    const variants = {
      primary:
        "bg-gradient-to-br from-forest to-medium-green text-white shadow-[0_4px_15px_rgba(11,61,46,0.3)] hover:-translate-y-0.5",
      secondary:
        "bg-transparent border-2 border-white/60 text-white hover:bg-white/10",
      ghost: "bg-transparent text-forest hover:bg-soft-green/20",
      gold: "bg-gradient-to-br from-gold to-[#c4913d] text-white shadow-[0_4px_15px_rgba(214,168,79,0.3)]",
      outline:
        "bg-white text-forest border border-forest/20 hover:bg-cream",
    };
    const sizes = {
      default: "px-6 py-3.5 text-base rounded-[14px]",
      sm: "px-4 py-2 text-sm rounded-xl",
    };
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex w-full items-center justify-center font-bold transition-all duration-200 active:translate-y-0 disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        style={{ fontFamily: "var(--font-heading)" }}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
