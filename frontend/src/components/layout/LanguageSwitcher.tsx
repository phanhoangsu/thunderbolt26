"use client";

import { useLanguage, type Language } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "vi", label: "VI" },
  ];

  return (
    <div
      className={`lang-switcher flex items-center gap-3 rounded-full border border-soft-green/40 bg-soft-green/10 px-3 py-1.5 ${className}`}
      role="group"
      aria-label="Language"
    >
      <Globe size={20} className="shrink-0 text-soft-green" aria-hidden />
      <div className="flex gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => setLanguage(lang.code)}
            className={`rounded-full px-3 py-1.5 text-sm font-bold min-w-[44px] flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-gold/50 ${
              language === lang.code
                ? "bg-gold text-forest shadow-sm"
                : "text-soft-green hover:bg-soft-green/20"
            }`}
            aria-pressed={language === lang.code}
            title={lang.code === "en" ? "English" : "Tiếng Việt"}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}
