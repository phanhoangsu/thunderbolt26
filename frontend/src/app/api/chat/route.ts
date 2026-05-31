import { EVENT_MASTER_SYSTEM_PROMPT } from "@/lib/event-master-prompt";
import { NextRequest, NextResponse } from "next/server";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY?.trim();

  // Log whether an API key is present (boolean) to aid debugging without printing secrets
  console.error("GROQ_API_KEY set:", !!process.env.GROQ_API_KEY);

  // If the key is missing, in development return a safe mock reply so the chat UI can be tested locally.
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "GROQ_API_KEY not set — returning mock reply for development. Add GROQ_API_KEY to .env.local to test the real AI.",
      );
      return NextResponse.json({
        reply: "Xin chào! Đây là phản hồi giả cho môi trường phát triển.",
      });
    }

    return NextResponse.json(
      {
        error:
          "Chưa cấu hình GROQ_API_KEY trên Vercel (Settings → Environment Variables → Production).",
        code: "MISSING_API_KEY",
      },
      { status: 500 },
    );
  }

  let body: { messages?: ChatMessage[]; language?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Dữ liệu không hợp lệ." },
      { status: 400 },
    );
  }

  const messages = body.messages;
  const language = body.language === "en" ? "en" : "vi";

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "Thiếu lịch sử tin nhắn." },
      { status: 400 },
    );
  }

  const languageInstruction =
    language === "en"
      ? "\n\nIMPORTANT: Always reply in English."
      : "\n\nQUAN TRỌNG: Luôn trả lời bằng tiếng Việt.";

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: EVENT_MASTER_SYSTEM_PROMPT + languageInstruction,
            },
            ...messages.map((message) => ({
              role: message.role,
              content: message.content,
            })),
          ],
          temperature: 0.8,
          max_tokens: 1024,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", response.status, errorText);

      if (response.status === 401 || response.status === 403) {
        return NextResponse.json(
          {
            error:
              language === "en"
                ? "Invalid GROQ_API_KEY on server. Update it in Vercel → Settings → Environment Variables → Production, then Redeploy."
                : "GROQ_API_KEY trên Vercel không hợp lệ. Vào Vercel → Settings → Environment Variables → Production, cập nhật key mới rồi Redeploy.",
            code: "INVALID_API_KEY",
          },
          { status: 502 },
        );
      }

      if (response.status === 429) {
        return NextResponse.json(
          {
            error:
              language === "en"
                ? "Groq AI daily limit reached. Wait ~1 hour or upgrade at console.groq.com. Try again later."
                : "Groq AI đã hết quota hôm nay. Đợi ~1 giờ hoặc nâng cấp tại console.groq.com rồi thử lại.",
            code: "RATE_LIMIT",
          },
          { status: 502 },
        );
      }

      return NextResponse.json(
        {
          error:
            language === "en"
              ? "Could not connect to AI service. Check GROQ_API_KEY on Vercel and Redeploy."
              : "Không kết nối được AI. Kiểm tra GROQ_API_KEY trên Vercel (Production) rồi Redeploy.",
          code: "GROQ_ERROR",
        },
        { status: 502 },
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json(
        { error: "Không nhận được phản hồi từ AI." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Lỗi hệ thống. Vui lòng thử lại sau." },
      { status: 500 },
    );
  }
}
