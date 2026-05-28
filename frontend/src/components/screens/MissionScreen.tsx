"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { forestMission } from "@/lib/mock-data";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Award, Camera, Check, Mic, QrCode, Zap } from "lucide-react";
import { useState } from "react";

export function MissionScreen() {
  const { missionStarted, missionSubmitted, startMission, submitMission } = useApp();
  const [checks, setChecks] = useState([false, false]);

  return (
    <div className="screen-page mission-mockup max-w-3xl mx-auto">
      <PageHeader title={forestMission.title} subtitle={forestMission.type} showBack={false} />

      <div className="mission-mockup__hero mb-6">
        <div className="mission-mockup__hero-img" />
        <div className="mission-mockup__hero-overlay" />
        <div className="absolute bottom-4 left-4 z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-forest backdrop-blur-sm">
            <QrCode size={14} /> QR Mission
          </span>
        </div>
      </div>

      <div className="pro-card mb-6">
        <p className="text-base leading-relaxed text-[#4a5d52]">{forestMission.description}</p>

        <p className="pro-section-title text-sm mt-6 mb-3">Yêu cầu</p>
        {forestMission.requirements.slice(0, 2).map((req, i) => (
          <button
            key={req}
            type="button"
            onClick={() => setChecks((p) => p.map((c, idx) => (idx === i ? !c : c)))}
            className="mission-mockup__check w-full"
          >
            <div className={cn("check-box", checks[i] && "checked")}>
              {checks[i] && <Check size={12} className="text-white" />}
            </div>
            <span className="text-sm">{req}</span>
          </button>
        ))}

        <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
          <div className="flex flex-1 items-center gap-2 rounded-xl bg-gold/10 px-4 py-3">
            <Zap size={18} className="text-gold" />
            <span className="text-sm font-bold text-forest">+{forestMission.xpReward} XP</span>
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-xl bg-soft-green/20 px-4 py-3">
            <Award size={18} className="text-medium-green" />
            <span className="text-sm font-bold text-forest">Nature Badge</span>
          </div>
        </div>
      </div>

      {!missionStarted ? (
        <button type="button" className="btn-mockup btn-mockup--primary" onClick={startMission}>
          Bắt đầu nhiệm vụ
        </button>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="pro-card">
            <p className="font-bold text-forest mb-4">Nộp minh chứng</p>
            <button type="button" className="mission-mockup__upload">
              <Camera size={20} /> Chụp / tải ảnh nhóm
            </button>
            <button type="button" className="mission-mockup__upload">
              <Mic size={20} /> Ghi âm 3 âm thanh
            </button>
          </div>
          {!missionSubmitted && (
            <button type="button" className="btn-mockup btn-mockup--primary" onClick={submitMission}>
              Nộp nhiệm vụ
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}
