"use client";

import { ReactNode } from "react";

export function AppLayout({ children }: { children: ReactNode }) {
  return <div className="app-layout">{children}</div>;
}
