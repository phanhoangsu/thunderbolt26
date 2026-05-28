"use client";

import { cn } from "@/lib/utils";

export function StatusBar({ light = false }: { light?: boolean }) {
  const color = light ? "white" : "#1a1a1a";
  return (
    <div
      className={cn(
        "flex items-center justify-between px-5 py-2 text-sm font-semibold",
        light ? "text-white" : "text-dark",
      )}
    >
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="8" width="3" height="4" rx="0.5" fill={color} />
          <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill={color} />
          <rect x="9" y="2" width="3" height="10" rx="0.5" fill={color} />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill={color} />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path
            d="M8 11.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zM1.34 4.66a9.25 9.25 0 0113.32 0M4.01 7.34a5.5 5.5 0 017.98 0"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <svg width="27" height="12" viewBox="0 0 27 12" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="22"
            height="11"
            rx="2"
            stroke={color}
            strokeOpacity="0.35"
          />
          <rect x="2" y="2" width="18" height="7" rx="1" fill={color} />
        </svg>
      </div>
    </div>
  );
}
