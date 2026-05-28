import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function Card({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[20px] bg-white p-4",
        "shadow-[0_4px_20px_rgba(11,61,46,0.07)]",
        "border border-[rgba(168,213,186,0.25)]",
        "transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(11,61,46,0.1)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
