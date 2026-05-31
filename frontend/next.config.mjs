import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Monorepo: repo root có frontend/ — đồng bộ 2 giá trị này để tránh warning trên Vercel
  outputFileTracingRoot: __dirname,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
