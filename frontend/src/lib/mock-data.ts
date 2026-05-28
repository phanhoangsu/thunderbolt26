import type {
  Achievement,
  Badge,
  Checkpoint,
  Memory,
  Mission,
  Skill,
  UserProfile,
} from "./types";

export const defaultProfile: UserProfile = {
  name: "Hoàng Sử",
  level: "Explorer",
  levelNum: 1,
  xp: 120,
  xpMax: 500,
  avatar: "HS",
  personalMission: "Kết bạn với 3 người mới.",
  skills: [
    { label: "Tự tin", before: 40, after: 60 },
    { label: "Giao tiếp", before: 35, after: 55 },
    { label: "Làm việc nhóm", before: 30, after: 65 },
    { label: "Giải quyết vấn đề", before: 45, after: 60 },
    { label: "Sáng tạo", before: 50, after: 70 },
  ],
};

export const growthSkills: Skill[] = [
  { label: "Tự tin", before: 40, after: 60 },
  { label: "Làm việc nhóm", before: 30, after: 65 },
  { label: "Giao tiếp", before: 35, after: 55 },
  { label: "Giải quyết vấn đề", before: 45, after: 60 },
  { label: "Lãnh đạo", before: 25, after: 50 },
  { label: "Tự kiểm soát", before: 38, after: 58 },
  { label: "Quản lý thời gian", before: 32, after: 52 },
];

export const badges: Badge[] = [
  {
    id: "explorer",
    name: "Nhà Thám Hiểm",
    icon: "🧭",
    unlocked: true,
    description: "Bắt đầu hành trình",
  },
  {
    id: "team-player",
    name: "Người Chơi Nhóm",
    icon: "🤝",
    unlocked: true,
    description: "Làm việc nhóm tốt",
  },
  {
    id: "nature-lover",
    name: "Yêu Thiên Nhiên",
    icon: "🌿",
    unlocked: true,
    description: "Yêu thiên nhiên",
  },
  { id: "brave-starter", name: "Khởi Đầu Dũng Cảm", icon: "⚡", unlocked: false },
  { id: "problem-solver", name: "Giải Quyết Vấn Đề", icon: "🧩", unlocked: false },
  { id: "camp-helper", name: "Người Giúp Trại", icon: "🏕️", unlocked: false },
  { id: "good-listener", name: "Lắng Nghe Tốt", icon: "👂", unlocked: false },
  { id: "young-leader", name: "Lãnh Đạo Trẻ", icon: "⭐", unlocked: false },
  { id: "time-master", name: "Quản Lý Thời Gian", icon: "⏰", unlocked: false },
  {
    id: "real-life-warrior",
    name: "Chiến Binh Thực Tế",
    icon: "🛡️",
    unlocked: false,
  },
];

export const checkpoints: Checkpoint[] = [
  {
    id: "start",
    name: "Khởi Đầu",
    subtitle: "Check-in",
    day: 1,
    status: "completed",
    icon: "🏕️",
  },
  {
    id: "forest",
    name: "Điểm Rừng",
    subtitle: "Nhiệm vụ QR",
    day: 1,
    status: "active",
    icon: "🌲",
    missionId: "forest-point",
  },
  {
    id: "river",
    name: "Điểm Sông",
    subtitle: "Thử thách nhóm",
    day: 1,
    status: "completed",
    icon: "🌊",
  },
  {
    id: "kitchen",
    name: "Bếp Trại",
    subtitle: "Nấu ăn nhóm",
    day: 1,
    status: "completed",
    icon: "🍳",
  },
  {
    id: "sunset",
    name: "Đồi Hoàng Hôn",
    subtitle: "Suy ngẫm",
    day: 1,
    status: "locked",
    icon: "🌅",
  },
  {
    id: "sunrise",
    name: "Bình Minh",
    subtitle: "Thể dục & check-in",
    day: 2,
    status: "locked",
    icon: "🌄",
  },
  {
    id: "obstacle",
    name: "Vượt Chướng Ngại",
    subtitle: "Thử thách nhóm",
    day: 2,
    status: "locked",
    icon: "🧗",
  },
  {
    id: "deep-forest",
    name: "Rừng Sâu",
    subtitle: "Nhiệm vụ QR",
    day: 2,
    status: "locked",
    icon: "🌿",
  },
  {
    id: "circle",
    name: "Circle Time",
    subtitle: "Chia sẻ nhóm",
    day: 2,
    status: "locked",
    icon: "💭",
  },
  {
    id: "boss",
    name: "Trại Cuối",
    subtitle: "Thử thách Boss",
    day: 2,
    status: "locked",
    icon: "🔥",
  },
];

export const forestMission: Mission = {
  id: "forest-point",
  title: "Điểm Rừng",
  type: "Nhiệm vụ QR",
  description: "Tìm 3 âm thanh của thiên nhiên và ghi lại.",
  requirements: [
    "Tìm 3 âm thanh khác nhau",
    "Chụp 1 ảnh tại địa điểm này",
    "Trả lời 1 câu hỏi suy ngẫm",
    "Hoàn thành cùng đội của bạn",
  ],
  xpReward: 30,
  badgeReward: "Huy hiệu Thiên Nhiên",
  status: "pending",
};

export const memories: Memory[] = [
  {
    id: "1",
    title: "Forest Point",
    location: "Forest Point",
    date: "Ngày 1 · 14:30",
    note: "Nghe tiếng suối và chim hót.",
    mood: "😊",
    gradient: "from-[#2E7D32] to-[#A8D5BA]",
  },
  {
    id: "2",
    title: "Nấu ăn nhóm",
    location: "Team Kitchen",
    date: "Ngày 1 · 18:00",
    note: "Cùng nhau nấu bữa tối.",
    mood: "🔥",
    gradient: "from-[#D6A84F] to-[#E6D8B8]",
  },
  {
    id: "3",
    title: "Hoàng hôn",
    location: "Sunset Hill",
    date: "Ngày 1 · 17:45",
    note: "Suy ngẫm về một ngày đầy thử thách.",
    mood: "🌅",
    gradient: "from-[#0B3D2E] to-[#2E7D32]",
  },
  {
    id: "4",
    title: "Final Camp",
    location: "Final Camp",
    date: "Ngày 2 · 20:00",
    note: "Đêm lửa trại cuối cùng.",
    mood: "⭐",
    gradient: "from-[#134a38] to-[#A8D5BA]",
  },
];

export const achievements: Achievement[] = [
  {
    id: "1",
    text: "Hoàn thành nhiệm vụ Điểm Rừng",
    xp: 30,
    date: "Hôm nay",
  },
  { id: "2", text: "Tham gia nấu ăn nhóm", xp: 20, date: "Hôm qua" },
  { id: "3", text: "Giúp đỡ đồng đội", xp: 15, date: "Hôm qua" },
];

export const promiseExamples = [
  "Dành nhiều thời gian ngoài trời hơn",
  "Nói chuyện nhiều hơn với bạn bè và gia đình",
  "Kiểm soát thời gian chơi game tốt hơn",
  "Tham gia nhiều hoạt động đời thực hơn",
  "Giúp đội khi đội cần mình",
];

export const coachNote =
  "Hoàng Sử làm việc nhóm rất tốt và tự tin hơn rõ rệt trong các thử thách ngoài trời. Đây là tiến bộ thực sự đáng khen.";
