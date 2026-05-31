# WEEKEND WARRIORS

Ứng dụng web mobile-first cho chương trình trại **2 ngày 1 đêm** — giúp thanh thiếu niên 11–18 tuổi theo dõi hành trình, nhiệm vụ, XP, huy hiệu và phát triển bản thân.

> *More than a trip — Hành trình trưởng thành*

---

## Hướng dẫn sử dụng nhanh

1. Mở app → **Đăng ký** (mới) hoặc **Đăng nhập**
2. Vào **Trang chủ** — xem XP, cấp độ, thống kê
3. **Hành trình** — theo dõi checkpoint 2 ngày trại
4. **Nhiệm vụ** — làm Forest Mission (quiz + upload ảnh) → **+30 XP**
5. **Thành tích** — xem huy hiệu và lịch sử XP
6. Cần trợ giúp? Bấm nút chat **góc phải màn hình** 🤖

---

## Tính năng

### 1. Tài khoản & bảo mật
- Màn chào mừng với nút **Đăng ký** / **Đăng nhập**
- Đăng ký, đăng nhập, đăng xuất (lưu trên trình duyệt qua localStorage)
- Bảo vệ route — phải đăng nhập mới truy cập các màn chính
- **XP riêng từng user** — người mới đăng ký bắt đầu từ **0**, người cũ giữ nguyên điểm

### 2. Trang chủ (Dashboard)
- Hiển thị tên, email, **tổng XP**, cấp độ Explorer
- Thống kê nhanh: nhiệm vụ hoàn thành, huy hiệu đã mở
- Menu khám phá: Hành trình, Nhiệm vụ, Thành tích, Ký ức, Phát triển, Phụ huynh, Cam kết tương lai

### 3. Hành trình (Journey Map)
- Bản đồ hành trình **2 ngày** với các điểm dừng
- Checkpoints: Khởi Đầu → Điểm Rừng → Điểm Sông → Bếp Trại → Đồi Hoàng Hôn → (Ngày 2) Bình Minh → Vượt Chướng Ngại → Rừng Sâu → Circle Time → Trại Cuối
- Trạng thái: **Hoàn thành / Đang active / Khóa**
- Timeline + bản đồ trực quan, chuyển **Ngày 1 / Ngày 2**

### 4. Nhiệm vụ (Missions)
- Nhiệm vụ chính: **Forest Mission** tại Điểm Rừng
- **Quiz trắc nghiệm** — trả lời đúng ≥ 3/5 câu mỗi phần
- **Upload ảnh** — chụp/tải ảnh thực tế
- Hoàn thành → **+30 XP**, mở checkpoint tiếp theo, toast thông báo

### 5. Thành tích & Huy hiệu (Badges)
- Huy hiệu: Nhà Thám Hiểm, Người Chơi Nhóm, Yêu Thiên Nhiên, Khởi Đầu Dũng Cảm...
- Tổng XP dạng vòng tròn + lịch sử hoạt động

### 6. Hồ sơ cá nhân (Profile)
- Avatar, tên, cấp Explorer, thanh XP
- 5 kỹ năng: Tự tin, Giao tiếp, Làm việc nhóm, Giải quyết vấn đề, Sáng tạo

### 7. Ký ức (Memories)
- Thư viện khoảnh khắc trại + nhật ký suy ngẫm

### 8. Phát triển bản thân (Growth)
- Biểu đồ radar kỹ năng Trước / Sau trại + phản hồi coach

### 9. Bảng Phụ huynh (Parent Dashboard)
- Theo dõi XP, nhiệm vụ, huy hiệu, hoạt động nhóm của con

### 10. Cam kết tương lai (Future Promise)
- Viết lời hứa sau trại, gợi ý mẫu sẵn, lưu cá nhân

### 11. Chatbot AI — WEEKEND WARRIORS 🤖
Trợ lý AI góc phải màn hình, có **2 vai trò**:

| Vai trò | Mô tả |
|---------|--------|
| **Hướng dẫn app** | Giải thích cách dùng app, kiếm XP, mở checkpoint, điều hướng màn hình |
| **Tư vấn trại** | Lên lịch trình 2N1Đ, ăn uống, ngủ nghỉ, chi phí, team building |

**Gợi ý nhanh trong chat:**
- Hướng dẫn sử dụng app 📱
- Làm sao kiếm XP? 🎯
- Gợi ý 3 địa điểm gần Hà Nội 🌲
- Trò chơi team building vui nhộn 🎮

**Ví dụ câu hỏi:**
- *"Hướng dẫn tôi dùng app"*
- *"Làm sao kiếm XP?"*
- *"Checkpoint bị khóa là sao?"*
- *"Lịch trình 2N1 cho 30 người"*

- Model: **Groq AI** (Llama 3.3 70B)
- System prompt: `src/lib/event-master-prompt.ts`

### 12. Đa ngôn ngữ
- **Tiếng Việt / English** — chuyển đổi trên hầu hết màn hình

### 13. Giao diện & UX
- Responsive: mobile, tablet, desktop
- Sidebar (desktop) + Bottom nav (mobile)
- Animation Framer Motion, theme xanh rừng + vàng gold

---

## Hệ thống XP & Cấp độ

| Cấp | Tên | XP cần |
|-----|-----|--------|
| Lv.1 | Explorer | 0 – 99 |
| Lv.2 | Camper | 100 – 199 |
| Lv.3 | Pathfinder | 200 – 299 |
| Lv.4 | Team Hero | 300 – 399 |
| Lv.5 | Weekend Warrior | 400+ |

- Tài khoản mới: **0 XP**
- Kiếm XP: hoàn thành nhiệm vụ (**+30 XP**/lần)
- Tiến độ lưu riêng theo từng user (`localStorage`)

---

## Chạy dự án

```bash
cd frontend
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

### Cấu hình Chatbot AI

Tạo file `.env.local` trong thư mục `frontend`:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Lấy API key tại [console.groq.com](https://console.groq.com). **Không commit** file `.env.local` lên git.

---

## Tech stack

| Công nghệ | Mục đích |
|-----------|----------|
| Next.js 16 (App Router) | Framework React full-stack |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Framer Motion | Animation |
| Recharts | Biểu đồ kỹ năng |
| Lucide React | Icons |
| Groq API | Chatbot AI |
| LocalStorage | Session, user, tiến độ từng tài khoản |

---

## API Routes

| Endpoint | Mô tả |
|----------|--------|
| `POST /api/auth/login` | Đăng nhập |
| `POST /api/auth/register` | Đăng ký |
| `POST /api/auth/logout` | Đăng xuất |
| `GET /api/profile` | Dữ liệu hồ sơ |
| `GET /api/journey` | Checkpoints hành trình |
| `GET /api/missions` | Nhiệm vụ |
| `GET /api/badges` | Huy hiệu |
| `GET /api/growth` | Dữ liệu phát triển |
| `GET /api/parent-report` | Báo cáo phụ huynh |
| `POST /api/chat` | Chatbot AI (Groq) |

---

## Cấu trúc thư mục

```
frontend/
├── public/                      # Ảnh tĩnh (avatar, forest_trail...)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/            # login, register, logout
│   │   │   └── chat/            # Chatbot AI endpoint
│   │   ├── globals.css
│   │   ├── pro-theme.css        # Theme + style chatbot
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── chat/
│   │   │   └── EventMasterChatbot.tsx
│   │   ├── charts/
│   │   ├── layout/
│   │   ├── screens/
│   │   └── ui/
│   ├── context/
│   │   ├── AppContext.tsx       # State toàn app, auth, XP
│   │   └── LanguageContext.tsx
│   └── lib/
│       ├── translations/        # vi.json, en.json
│       ├── event-master-prompt.ts  # System prompt chatbot AI
│       ├── mock-data.ts
│       ├── storage.ts           # Lưu trạng thái theo user
│       └── types.ts
├── .env.local                   # GROQ_API_KEY (không commit)
└── .env.example
```

---

## Scripts

```bash
npm run dev      # Chạy development server
npm run build    # Build production
npm run start    # Chạy production server
npm run lint     # Kiểm tra ESLint
```

---

## Deploy (Vercel)

Root directory: `frontend`

Thêm biến môi trường `GROQ_API_KEY` trên Vercel dashboard.

```bash
npm run build
```

---

## Tài khoản demo

| Email | Mật khẩu |
|-------|----------|
| `hoangsu@camp.vn` | `111111` |
| `demo@weekend.vn` | `demo123` |

Đăng ký tài khoản mới → XP bắt đầu từ **0**.

---

## FAQ

**Làm sao kiếm XP?**  
Vào **Nhiệm vụ** → hoàn thành Forest Mission (quiz + ảnh) → **Nộp nhiệm vụ** → +30 XP.

**Tại sao checkpoint bị khóa?**  
Phải hoàn thành checkpoint/nhiệm vụ trước đó trước.

**XP của tôi ở đâu?**  
Trang chủ (số lớn), màn Thành tích, Hồ sơ.

**Phụ huynh xem tiến độ con?**  
Vào màn **Phụ huynh** trên app.

**Cần trợ giúp thêm?**  
Bấm chatbot góc phải màn hình và hỏi trực tiếp! 🤖
