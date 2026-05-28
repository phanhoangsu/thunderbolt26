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
    name: "Explorer",
    icon: "🧭",
    unlocked: true,
    description: "Bắt đầu hành trình",
  },
  {
    id: "team-player",
    name: "Team Player",
    icon: "🤝",
    unlocked: true,
    description: "Làm việc nhóm tốt",
  },
  {
    id: "nature-lover",
    name: "Nature Lover",
    icon: "🌿",
    unlocked: true,
    description: "Yêu thiên nhiên",
  },
  { id: "brave-starter", name: "Brave Starter", icon: "⚡", unlocked: false },
  { id: "problem-solver", name: "Problem Solver", icon: "🧩", unlocked: false },
  { id: "camp-helper", name: "Camp Helper", icon: "🏕️", unlocked: false },
  { id: "good-listener", name: "Good Listener", icon: "👂", unlocked: false },
  { id: "young-leader", name: "Young Leader", icon: "⭐", unlocked: false },
  { id: "time-master", name: "Time Master", icon: "⏰", unlocked: false },
  {
    id: "real-life-warrior",
    name: "Real-Life Warrior",
    icon: "🛡️",
    unlocked: false,
  },
];

export const checkpoints: Checkpoint[] = [
  {
    id: "start",
    name: "Start Camp",
    subtitle: "Check-in",
    day: 1,
    status: "completed",
    icon: "🏕️",
  },
  {
    id: "forest",
    name: "Forest Point",
    subtitle: "QR Mission",
    day: 1,
    status: "active",
    icon: "🌲",
    missionId: "forest-point",
  },
  {
    id: "river",
    name: "River Point",
    subtitle: "Team Challenge",
    day: 1,
    status: "completed",
    icon: "🌊",
  },
  {
    id: "sunset",
    name: "Sunset Hill",
    subtitle: "Reflection",
    day: 1,
    status: "locked",
    icon: "🌅",
  },
  {
    id: "final",
    name: "Final Camp",
    subtitle: "Boss Challenge",
    day: 2,
    status: "locked",
    icon: "🔥",
  },
  { id: "checkin", name: "Check-in", day: 1, status: "completed", icon: "✅" },
  {
    id: "team",
    name: "Team Challenge",
    day: 1,
    status: "completed",
    icon: "🤝",
  },
  { id: "qr", name: "QR Mission", day: 1, status: "locked", icon: "📱" },
  {
    id: "reflection",
    name: "Reflection Time",
    day: 2,
    status: "locked",
    icon: "💭",
  },
  { id: "boss", name: "Boss Challenge", day: 2, status: "locked", icon: "🚩" },
];

export const forestMission: Mission = {
  id: "forest-point",
  title: "Forest Point",
  type: "QR Mission",
  description: "Tìm 3 âm thanh của thiên nhiên và ghi lại.",
  requirements: [
    "Tìm 3 âm thanh khác nhau",
    "Chụp 1 ảnh tại địa điểm này",
    "Trả lời 1 câu hỏi suy ngẫm",
    "Hoàn thành cùng đội của bạn",
  ],
  xpReward: 30,
  badgeReward: "Nature Badge",
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
    text: "Hoàn thành nhiệm vụ Forest Point",
    xp: 30,
    date: "Hôm nay",
  },
  { id: "2", text: "Tham gia nấu ăn nhóm", xp: 20, date: "Hôm qua" },
  { id: "3", text: "Giúp đồng đội", xp: 15, date: "Hôm qua" },
];

export const promiseExamples = [
  "Dành nhiều thời gian ngoài trời hơn",
  "Nói chuyện nhiều hơn với bạn bè và gia đình",
  "Kiểm soát thời gian chơi game tốt hơn",
  "Tham gia nhiều hoạt động đời thực hơn",
  "Giúp đội khi đội cần mình",
];

export const coachNote =
  "Hoàng Sử làm việc nhóm tốt và tự tin hơn trong các thử thách ngoài trời.";
