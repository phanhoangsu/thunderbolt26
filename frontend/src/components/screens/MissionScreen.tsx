"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { useApp } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  getRequirementKind,
  getRequirementQuizzes,
  PHOTO_REQUIREMENT_INDEX,
  QUIZ_PASS_THRESHOLD,
  QUIZ_QUESTIONS_PER_REQ,
} from "@/lib/mission-quiz-content";
import { useTranslatedData } from "@/lib/use-translated-data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Award, Camera, Check, FileIcon, QrCode, X, Zap } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";

interface UploadedFile {
  id: string;
  file: File;
  previewUrl?: string;
}

/** reqIndex -> questionIndex -> answered correctly (locked) */
type QuizProgress = Record<number, Record<number, boolean>>;

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function countCorrect(progress: Record<number, boolean> | undefined): number {
  if (!progress) return 0;
  return Object.values(progress).filter(Boolean).length;
}

export function MissionScreen() {
  const { missionStarted, missionSubmitted, startMission, submitMission } = useApp();
  const { t, language } = useLanguage();
  const { forestMission } = useTranslatedData();
  const requirementCount = forestMission.requirements.length;

  const [checks, setChecks] = useState(() => Array(requirementCount).fill(false));
  const [activeReq, setActiveReq] = useState<number | null>(null);
  const [quizProgress, setQuizProgress] = useState<QuizProgress>({});
  const [lastWrong, setLastWrong] = useState<{ req: number; q: number; opt: number } | null>(null);
  const [photoUploads, setPhotoUploads] = useState<UploadedFile[]>([]);
  const photoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setChecks(Array(requirementCount).fill(false));
    setActiveReq(null);
    setQuizProgress({});
  }, [requirementCount, language]);

  useEffect(() => {
    return () => {
      photoUploads.forEach((item) => {
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      });
    };
  }, [photoUploads]);

  const updateRequirementComplete = (reqIndex: number, complete: boolean) => {
    setChecks((prev) => prev.map((c, i) => (i === reqIndex ? complete : c)));
  };

  const handleRequirementClick = (index: number) => {
    setActiveReq((prev) => (prev === index ? null : index));
    setLastWrong(null);
  };

  const handleQuizAnswer = (reqIndex: number, questionIndex: number, optionIndex: number) => {
    const quizzes = getRequirementQuizzes(reqIndex, language);
    const quiz = quizzes?.[questionIndex];
    if (!quiz) return;

    if (quizProgress[reqIndex]?.[questionIndex]) return;

    const isCorrect = optionIndex === quiz.correctIndex;

    if (isCorrect) {
      setLastWrong(null);
      setQuizProgress((prev) => {
        const reqProgress = { ...(prev[reqIndex] ?? {}), [questionIndex]: true };
        const correctCount = countCorrect(reqProgress);
        if (correctCount >= QUIZ_PASS_THRESHOLD) {
          updateRequirementComplete(reqIndex, true);
        }
        return { ...prev, [reqIndex]: reqProgress };
      });
    } else {
      setLastWrong({ req: reqIndex, q: questionIndex, opt: optionIndex });
    }
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected?.length) return;

    const newUploads = Array.from(selected).map((file) => ({
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      file,
      previewUrl: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined,
    }));

    setPhotoUploads((prev) => {
      const merged = [...prev, ...newUploads];
      if (merged.length > 0) updateRequirementComplete(PHOTO_REQUIREMENT_INDEX, true);
      return merged;
    });
    e.target.value = "";
  };

  const removePhoto = (id: string) => {
    setPhotoUploads((prev) => {
      const item = prev.find((u) => u.id === id);
      if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl);
      const next = prev.filter((u) => u.id !== id);
      updateRequirementComplete(PHOTO_REQUIREMENT_INDEX, next.length > 0);
      return next;
    });
  };

  const renderFileList = (
    uploads: UploadedFile[],
    onRemove: (id: string) => void,
  ) => (
    <div className="mission-mockup__files">
      <p className="mission-mockup__files-title">
        {t("missions.uploadedFiles", { count: uploads.length })}
      </p>
      <div className="mission-mockup__files-grid">
        {uploads.map((item) => (
          <div key={item.id} className="mission-mockup__file-item">
            {item.previewUrl ? (
              <img
                src={item.previewUrl}
                alt={item.file.name}
                className="mission-mockup__file-preview"
              />
            ) : (
              <div className="mission-mockup__file-icon">
                <FileIcon size={28} className="text-medium-green" />
              </div>
            )}
            <div className="mission-mockup__file-meta">
              <p className="mission-mockup__file-name" title={item.file.name}>
                {item.file.name}
              </p>
              <p className="mission-mockup__file-size">{formatFileSize(item.file.size)}</p>
            </div>
            <button
              type="button"
              className="mission-mockup__file-remove"
              onClick={() => onRemove(item.id)}
              aria-label={t("missions.removeFile")}
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="screen-page mission-mockup max-w-3xl mx-auto">
      <PageHeader title={forestMission.title} subtitle={forestMission.type} showBack={false} />

      <div className="mission-mockup__hero mb-6">
        <div className="mission-mockup__hero-img" />
        <div className="mission-mockup__hero-overlay" />
        <div className="absolute bottom-4 left-4 z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-forest backdrop-blur-sm">
            <QrCode size={14} /> {t("missions.qrMission")}
          </span>
        </div>
      </div>

      <div className="pro-card mb-6">
        <p className="text-base leading-relaxed text-[#4a5d52]">{forestMission.description}</p>

        <p className="pro-section-title text-sm mt-6 mb-3">{t("missions.requirements")}</p>

        {forestMission.requirements.map((req, i) => {
          const kind = getRequirementKind(i);
          const isOpen = activeReq === i;
          const quizzes = kind === "quiz" ? getRequirementQuizzes(i, language) : null;
          const correctCount = countCorrect(quizProgress[i]);
          const reqPassed = checks[i];

          return (
            <div key={req} className="mission-mockup__req-block">
              <button
                type="button"
                onClick={() => handleRequirementClick(i)}
                className={cn(
                  "mission-mockup__check w-full",
                  isOpen && "mission-mockup__check--active",
                )}
              >
                <div className={cn("check-box", reqPassed && "checked")}>
                  {reqPassed && <Check size={12} className="text-white" />}
                </div>
                <span className="text-sm flex-1">{req}</span>
                {kind === "quiz" && (
                  <span className="mission-mockup__req-score">
                    {correctCount}/{QUIZ_QUESTIONS_PER_REQ}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isOpen && kind === "photo" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mission-mockup__quiz"
                  >
                    <p className="mission-mockup__quiz-label">{t("missions.photoUploadTitle")}</p>
                    <p className="mission-mockup__quiz-question">{t("missions.photoUploadHint")}</p>

                    <input
                      ref={photoInputRef}
                      type="file"
                      accept="*/*"
                      multiple
                      className="mission-mockup__file-input"
                      onChange={handlePhotoChange}
                    />

                    <button
                      type="button"
                      className="mission-mockup__upload"
                      onClick={() => photoInputRef.current?.click()}
                    >
                      <Camera size={20} /> {t("missions.uploadPhoto")}
                    </button>

                    {photoUploads.length > 0 && renderFileList(photoUploads, removePhoto)}

                    {reqPassed && (
                      <p className="mission-mockup__quiz-feedback mission-mockup__quiz-feedback--ok">
                        {t("missions.photoComplete")}
                      </p>
                    )}
                  </motion.div>
                )}

                {isOpen && kind === "quiz" && quizzes && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mission-mockup__quiz"
                  >
                    <div className="mission-mockup__quiz-header">
                      <p className="mission-mockup__quiz-label">{t("missions.quizTitle")}</p>
                      <p
                        className={cn(
                          "mission-mockup__quiz-progress",
                          reqPassed && "mission-mockup__quiz-progress--done",
                        )}
                      >
                        {t("missions.quizProgress", {
                          correct: correctCount,
                          total: QUIZ_QUESTIONS_PER_REQ,
                          pass: QUIZ_PASS_THRESHOLD,
                        })}
                      </p>
                    </div>

                    {quizzes.map((quiz, qIndex) => {
                      const questionDone = quizProgress[i]?.[qIndex] === true;

                      return (
                        <div key={qIndex} className="mission-mockup__quiz-item">
                          <p className="mission-mockup__quiz-qnum">
                            {t("missions.questionNum", { num: qIndex + 1 })}
                          </p>
                          <p className="mission-mockup__quiz-question">{quiz.question}</p>

                          <div className="mission-mockup__quiz-options">
                            {quiz.options.map((opt, optIndex) => {
                              const showWrong =
                                lastWrong?.req === i &&
                                lastWrong?.q === qIndex &&
                                lastWrong?.opt === optIndex &&
                                !questionDone;

                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  disabled={questionDone}
                                  onClick={() => handleQuizAnswer(i, qIndex, optIndex)}
                                  className={cn(
                                    "mission-mockup__quiz-opt",
                                    questionDone &&
                                      optIndex === quiz.correctIndex &&
                                      "mission-mockup__quiz-opt--correct",
                                    showWrong && "mission-mockup__quiz-opt--wrong",
                                  )}
                                >
                                  <span className="mission-mockup__quiz-opt-letter">
                                    {String.fromCharCode(65 + optIndex)}
                                  </span>
                                  <span>{opt}</span>
                                </button>
                              );
                            })}
                          </div>

                          {questionDone && (
                            <p className="mission-mockup__quiz-item-ok">✓</p>
                          )}
                        </div>
                      );
                    })}

                    {reqPassed ? (
                      <p className="mission-mockup__quiz-feedback mission-mockup__quiz-feedback--ok">
                        {t("missions.quizPassed", { pass: QUIZ_PASS_THRESHOLD })}
                      </p>
                    ) : (
                      lastWrong?.req === i && (
                        <p className="mission-mockup__quiz-feedback mission-mockup__quiz-feedback--err">
                          {t("missions.wrongAnswer")}
                        </p>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
          <div className="flex flex-1 items-center gap-2 rounded-xl bg-gold/10 px-4 py-3">
            <Zap size={18} className="text-gold" />
            <span className="text-sm font-bold text-forest">+{forestMission.xpReward} XP</span>
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-xl bg-soft-green/20 px-4 py-3">
            <Award size={18} className="text-medium-green" />
            <span className="text-sm font-bold text-forest">{forestMission.badgeReward}</span>
          </div>
        </div>
      </div>

      {!missionStarted ? (
        <button type="button" className="btn-mockup btn-mockup--primary" onClick={startMission}>
          {t("missions.start")}
        </button>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {!missionSubmitted && (
            <button type="button" className="btn-mockup btn-mockup--primary" onClick={submitMission}>
              {t("missions.submit")}
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}
