"use client";

import { EventMasterChatbot } from "@/components/chat/EventMasterChatbot";
import { LanguageProvider } from "@/context/LanguageContext";
import { ReactNode } from "react";

export function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      {children}
      <EventMasterChatbot />
    </LanguageProvider>
  );
}
