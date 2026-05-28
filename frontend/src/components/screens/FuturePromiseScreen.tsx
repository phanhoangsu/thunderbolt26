"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBar } from "@/components/layout/StatusBar";
import { promiseExamples } from "@/lib/mock-data";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import { useState } from "react";

export function FuturePromiseScreen() {
  const { profile, savePromise } = useApp();
  const [text, setText] = useState(profile.promise ?? "");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    savePromise(text);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="screen-page relative min-h-[70vh] overflow-hidden rounded-2xl">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #F7F3E8 0%, #E6D8B8 40%, #A8D5BA 70%, #0B3D2E 100%)",
        }}
      />
      <div className="relative z-10">
        <StatusBar />
        <div className="px-5 pb-10">
          <h1
            className="py-4 text-center text-xl font-extrabold text-forest"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Cam kết tương lai
          </h1>

          <Card>
            <p className="text-sm font-semibold text-forest">
              Sau hành trình này, tôi hứa sẽ…
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {promiseExamples.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => setText(ex)}
                  className="tag tag-green cursor-pointer hover:bg-soft-green/50"
                >
                  {ex}
                </button>
              ))}
            </div>

            <textarea
              className="mt-4 w-full resize-none rounded-xl border border-forest/10 bg-cream p-4 text-sm outline-none focus:border-medium-green"
              rows={4}
              placeholder="Viết lời hứa của bạn ở đây…"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="mt-3 border-t border-dashed border-warm-beige pt-3">
              <p className="text-xs text-muted">Chữ ký</p>
              <p className="font-serif text-2xl italic text-forest">{profile.name}</p>
            </div>
          </Card>

          <Button className="mt-4" onClick={handleSave}>
            {saved ? "Đã lưu ✓" : "Lưu cam kết"}
          </Button>

          <button
            type="button"
            className="mt-3 flex w-full items-center justify-center gap-2 text-sm font-semibold text-forest"
          >
            <Share2 size={16} /> Chia sẻ cam kết
          </button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center text-sm font-medium leading-relaxed text-forest/80"
          >
            Hành trình của bạn chưa kết thúc.
            <br />
            Đây là khởi đầu mới.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
