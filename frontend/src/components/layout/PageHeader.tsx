"use client";

import { useApp } from "@/context/AppContext";
import { ChevronLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export function PageHeader({ title, subtitle, showBack = true, onBack }: PageHeaderProps) {
  const { goBack } = useApp();

  return (
    <header className="page-header">
      <div className="flex items-center justify-between">
        {showBack ? (
          <button
            type="button"
            onClick={onBack ?? goBack}
            className="page-header__back"
            aria-label="Quay lại"
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
        <div className="w-11" />
      </div>
    </header>
  );
}
