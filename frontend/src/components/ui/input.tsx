import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "w-full rounded-xl border border-forest/10 bg-white px-4 py-3 text-sm text-dark outline-none transition focus:border-medium-green focus:ring-2 focus:ring-soft-green/40",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";
