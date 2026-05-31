import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  variant?: "green" | "gold";
}

export function Progress({
  value,
  max = 100,
  className,
  variant = "green",
}: ProgressProps) {
  const percent = Math.min(100, Math.round((value / max) * 100));
  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-light-gray",
        className
      )}
    >
      <div
        className={cn(
          "h-full rounded-full transition-all duration-700",
          variant === "gold"
            ? "bg-gradient-to-r from-gold to-[#f0c87a]"
            : "bg-gradient-to-r from-medium-green to-soft-green"
        )}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
