import { validateCredentials } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Vui lòng nhập email và mật khẩu." },
        { status: 400 }
      );
    }

    const user = validateCredentials(email, password, []);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Email hoặc mật khẩu không đúng." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Đã xảy ra lỗi. Thử lại sau." },
      { status: 500 }
    );
  }
}
