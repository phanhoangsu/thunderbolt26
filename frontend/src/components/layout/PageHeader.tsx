"use client";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useApp } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  showLanguage?: boolean;
  onBack?: () => void;
}

export function PageHeader({
  title,
  subtitle,
  showBack = true,
  showLanguage = true,
  onBack,
}: PageHeaderProps) {
  const { goBack } = useApp();
  const { t } = useLanguage();

  return (
    <header className="page-header">
      <div className="flex items-center justify-between">
        {showBack ? (
          <button
            type="button"
            onClick={onBack ?? goBack}
            className="page-header__back"
            aria-label={t("common.back")}
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
        ) : (
          <div className="w-11" />
        )}
        <div className="flex-1 text-center px-2">
          <h1 className="page-header__title">{title}</h1>
          {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
        </div>
        {/* {showLanguage ? (
          <LanguageSwitcher className="hidden shrink-0 origin-right scale-90 lg:flex" />
        ) : (
          <div className="w-11" />
        )} */}
      </div>
    </header>
  );
}
