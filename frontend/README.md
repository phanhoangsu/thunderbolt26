# WEEKEND WARRIORS

Ứng dụng web mobile-first cho chương trình trại 2 ngày 1 đêm — giúp thanh thiếu niên 11–18 tuổi theo dõi hành trình, nhiệm vụ, XP, huy hiệu và phát triển bản thân.

## Chạy dự án

```bash
cd frontend
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

## Tech stack

- Next.js App Router + TypeScript
- Tailwind CSS v4
- Framer Motion, Recharts, Lucide React
- LocalStorage + API routes mock

## Cấu trúc

- `src/app` — pages & API routes
- `src/components` — UI, layout, screens, charts
- `src/lib` — types, mock data, utils
- `src/context` — state toàn app

## Deploy Vercel

Root directory: `frontend`

```bash
npm run build
```
