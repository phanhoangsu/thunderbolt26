import { createRegisteredUser, emailExists } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json(
        { success: false, message: "Vui lòng điền đầy đủ thông tin." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Mật khẩu tối thiểu 6 ký tự." },
        { status: 400 }
      );
    }

    if (emailExists(email, [])) {
      return NextResponse.json(
        { success: false, message: "Email đã được sử dụng." },
        { status: 409 }
      );
    }

    const user = createRegisteredUser(name, email, password);

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
