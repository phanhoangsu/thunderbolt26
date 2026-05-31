import { EVENT_MASTER_SYSTEM_PROMPT } from "@/lib/event-master-prompt";
import { NextRequest, NextResponse } from "next/server";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Chưa cấu hình GROQ_API_KEY trên server." },
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
          model: "llama-3.3-70b-versatile",
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
          max_tokens: 2048,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", errorText);
      return NextResponse.json(
        { error: "Không thể kết nối WEEKEND WARRIORS. Vui lòng thử lại sau." },
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
