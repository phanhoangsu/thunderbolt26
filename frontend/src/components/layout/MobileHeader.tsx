"use client";

import { useApp } from "@/context/AppContext";
import { ScreenId } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const extraMenu: { id: ScreenId; label: string; emoji: string }[] = [
  { id: "memories", label: "Ký ức", emoji: "📸" },
  { id: "parent", label: "Phụ huynh", emoji: "👨‍👩‍👦" },
  { id: "growth", label: "Phát triển", emoji: "📊" },
  { id: "promise", label: "Cam kết", emoji: "🌟" },
];

export function MobileHeader() {
  const { navigateTo } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-header lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="mobile-header__btn"
        aria-label="Menu mở rộng"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mobile-header__backdrop"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="mobile-header__dropdown"
            >
              {extraMenu.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    navigateTo(item.id);
                    setOpen(false);
                  }}
                  className="mobile-header__item"
                >
                  <span>{item.emoji}</span>
                  {item.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
