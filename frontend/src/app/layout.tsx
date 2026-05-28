import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./pro-theme.css";

export const metadata: Metadata = {
  title: "Weekend Warriors — Hành trình trưởng thành",
  description:
    "Ứng dụng đồng hành chương trình 2 ngày 1 đêm giúp thanh thiếu niên theo dõi hành trình, phát triển kỹ năng và lưu ký ức.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0B3D2E",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
