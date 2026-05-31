"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Chào bạn! 🏕️ Mình là **WEEKEND WARRIORS** — trợ lý AI của app trại 2 ngày 1 đêm!\n\nMình có thể giúp bạn:\n• 📱 **Hướng dẫn sử dụng app** (XP, nhiệm vụ, huy hiệu, hành trình...)\n• 🗺️ **Lên kế hoạch chuyến đi** 2N1Đ (lịch trình, team building, chi phí)\n\nBạn cần hỗ trợ gì nhé? 🎒✨",
};

const QUICK_PROMPTS = [
  "Hướng dẫn sử dụng app 📱",
  "Làm sao kiếm XP? 🎯",
  "Gợi ý 3 địa điểm gần Hà Nội 🌲",
  "Trò chơi team building vui nhộn 🎮",
];

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function EventMasterChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      id: createId(),
      role: "user",
      content: trimmed,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const history = nextMessages
        .filter((message) => message.id !== "welcome")
        .map(({ role, content }) => ({ role, content }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Không thể gửi tin nhắn.");
      }

      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          content:
            error instanceof Error
              ? `⚠️ ${error.message}`
              : "⚠️ Có lỗi xảy ra. Vui lòng thử lại sau nhé!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    void sendMessage(input);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(input);
    }
  }

  return (
    <div className="event-master-chat">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="event-master-chat__panel"
            role="dialog"
            aria-label="WEKEND WARRIORS Chat"
          >
            <header className="event-master-chat__header">
              <div className="event-master-chat__header-info">
                <div className="event-master-chat__avatar">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="event-master-chat__title">WEKEND WARRIORS</h3>
                  <p className="event-master-chat__subtitle">
                    Trợ lý app & trại 🏕️
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="event-master-chat__close"
                onClick={() => setIsOpen(false)}
                aria-label="Đóng chat"
              >
                <X size={18} />
              </button>
            </header>

            <div className="event-master-chat__messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`event-master-chat__bubble event-master-chat__bubble--${message.role}`}
                >
                  {message.role === "assistant" && (
                    <span className="event-master-chat__bubble-icon">🏕️</span>
                  )}
                  <div className="event-master-chat__bubble-text">
                    {message.content.split("\n").map((line, index) => (
                      <p key={`${message.id}-${index}`}>
                        {line
                          .split(/(\*\*[^*]+\*\*)/)
                          .map((part, partIndex) =>
                            part.startsWith("**") && part.endsWith("**") ? (
                              <strong key={partIndex}>
                                {part.slice(2, -2)}
                              </strong>
                            ) : (
                              <span key={partIndex}>{part}</span>
                            ),
                          )}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="event-master-chat__bubble event-master-chat__bubble--assistant">
                  <span className="event-master-chat__bubble-icon">🏕️</span>
                  <div className="event-master-chat__typing">
                    <Loader2 size={16} className="event-master-chat__spinner" />
                    <span>WEKEND WARRIORS đang lên kế hoạch...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {!isLoading && messages.length <= 1 && (
              <div className="event-master-chat__quick-prompts">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    className="event-master-chat__quick-btn"
                    onClick={() => void sendMessage(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            <form
              className="event-master-chat__input-area"
              onSubmit={handleSubmit}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Hỏi về lịch trình, ăn uống, team building..."
                rows={1}
                disabled={isLoading}
                className="event-master-chat__input"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="event-master-chat__send"
                aria-label="Gửi tin nhắn"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className="event-master-chat__fab"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Đóng WEKEND WARRIORS" : "Mở WEKEND WARRIORS"}
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={26} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="event-master-chat__fab-content"
            >
              <MessageCircle size={26} />
              <span className="event-master-chat__fab-badge">AI</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
