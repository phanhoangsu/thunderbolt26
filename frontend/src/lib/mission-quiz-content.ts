import type { Language } from "@/context/LanguageContext";

export const PHOTO_REQUIREMENT_INDEX = 1;
export const QUIZ_PASS_THRESHOLD = 3;
export const QUIZ_QUESTIONS_PER_REQ = 5;

export type RequirementKind = "quiz" | "photo";

export interface LocalizedQuiz {
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
}

interface BilingualQuiz {
  question: { en: string; vi: string };
  options: [
    { en: string; vi: string },
    { en: string; vi: string },
    { en: string; vi: string },
    { en: string; vi: string },
  ];
  correctIndex: number;
}

export interface RequirementConfig {
  id: string;
  kind: RequirementKind;
}

export const MISSION_REQUIREMENTS: RequirementConfig[] = [
  { id: "sounds", kind: "quiz" },
  { id: "photo", kind: "photo" },
  { id: "reflection", kind: "quiz" },
  { id: "team", kind: "quiz" },
  { id: "nature", kind: "quiz" },
];

const QUIZ_BANK: Record<string, BilingualQuiz[]> = {
  sounds: [
    {
      question: {
        en: "Which sound is NOT from nature in the forest?",
        vi: "Âm thanh nào KHÔNG phải từ thiên nhiên trong rừng?",
      },
      options: [
        { en: "Car engine", vi: "Tiếng động cơ xe" },
        { en: "Birds singing", vi: "Tiếng chim hót" },
        { en: "Wind in the leaves", vi: "Tiếng gió xào xạc lá" },
        { en: "A flowing stream", vi: "Tiếng suối chảy" },
      ],
      correctIndex: 0,
    },
    {
      question: {
        en: "Why should we listen carefully to forest sounds?",
        vi: "Tại sao nên lắng nghe kỹ âm thanh trong rừng?",
      },
      options: [
        { en: "To notice details and connect with nature", vi: "Để cảm nhận chi tiết và gắn kết với thiên nhiên" },
        { en: "To scare animals away", vi: "Để làm động vật sợ hãi" },
        { en: "To avoid talking to teammates", vi: "Để tránh nói chuyện với đội" },
        { en: "To finish faster", vi: "Để hoàn thành nhanh hơn" },
      ],
      correctIndex: 0,
    },
    {
      question: {
        en: "How many different sounds should you find for this mission?",
        vi: "Bạn cần tìm bao nhiêu âm thanh khác nhau cho nhiệm vụ này?",
      },
      options: [
        { en: "1", vi: "1" },
        { en: "2", vi: "2" },
        { en: "3", vi: "3" },
        { en: "10", vi: "10" },
      ],
      correctIndex: 2,
    },
    {
      question: {
        en: "What is a good way to record nature sounds?",
        vi: "Cách tốt để ghi lại âm thanh thiên nhiên là gì?",
      },
      options: [
        { en: "Stay quiet and use a phone mic", vi: "Giữ im lặng và dùng mic điện thoại" },
        { en: "Shout loudly", vi: "Hét to" },
        { en: "Play music nearby", vi: "Bật nhạc gần đó" },
        { en: "Ignore the sounds", vi: "Bỏ qua âm thanh" },
      ],
      correctIndex: 0,
    },
    {
      question: {
        en: "Which place is best to hear natural sounds?",
        vi: "Nơi nào phù hợp nhất để nghe âm thanh tự nhiên?",
      },
      options: [
        { en: "Parking lot", vi: "Bãi đậu xe" },
        { en: "Shopping mall", vi: "Trung tâm thương mại" },
        { en: "Under trees near a stream", vi: "Dưới tán cây gần suối" },
        { en: "Indoor cafeteria", vi: "Phòng ăn trong nhà" },
      ],
      correctIndex: 2,
    },
  ],
  reflection: [
    {
      question: {
        en: "What is the main purpose of a reflection question?",
        vi: "Mục đích chính của câu hỏi suy ngẫm là gì?",
      },
      options: [
        { en: "To think about what you learned", vi: "Suy nghĩ về điều bạn học được" },
        { en: "To finish as fast as possible", vi: "Hoàn thành thật nhanh" },
        { en: "To copy a friend's answer", vi: "Sao chép câu trả lời bạn bè" },
        { en: "To skip the mission", vi: "Bỏ qua nhiệm vụ" },
      ],
      correctIndex: 0,
    },
    {
      question: {
        en: "A good reflection answer should be…",
        vi: "Câu trả lời suy ngẫm tốt nên…",
      },
      options: [
        { en: "Honest and personal", vi: "Trung thực và mang dấu ấn cá nhân" },
        { en: "Copied from the internet", vi: "Sao chép từ internet" },
        { en: "One word only", vi: "Chỉ một từ" },
        { en: "Left blank", vi: "Để trống" },
      ],
      correctIndex: 0,
    },
    {
      question: {
        en: "When is the best time to reflect on your camp day?",
        vi: "Khi nào là lúc tốt để suy ngẫm về ngày trại?",
      },
      options: [
        { en: "During a calm moment after activities", vi: "Trong khoảnh khắc yên tĩnh sau hoạt động" },
        { en: "While running a race", vi: "Khi đang chạy đua" },
        { en: "Never", vi: "Không bao giờ" },
        { en: "Only at home next month", vi: "Chỉ ở nhà tháng sau" },
      ],
      correctIndex: 0,
    },
    {
      question: {
        en: "Reflection helps you grow because it…",
        vi: "Suy ngẫm giúp bạn trưởng thành vì…",
      },
      options: [
        { en: "Turns experience into learning", vi: "Biến trải nghiệm thành bài học" },
        { en: "Avoids all mistakes forever", vi: "Tránh mọi sai lầm mãi mãi" },
        { en: "Replaces teamwork", vi: "Thay thế làm việc nhóm" },
        { en: "Reduces XP", vi: "Làm giảm XP" },
      ],
      correctIndex: 0,
    },
    {
      question: {
        en: "Which question is a reflection question?",
        vi: "Câu nào là câu hỏi suy ngẫm?",
      },
      options: [
        { en: "What did I learn about myself today?", vi: "Hôm nay tôi học được gì về bản thân?" },
        { en: "What is 2 + 2?", vi: "2 + 2 bằng mấy?" },
        { en: "What color is the sky?", vi: "Bầu trời màu gì?" },
        { en: "Who won the World Cup?", vi: "Ai vô địch World Cup?" },
      ],
      correctIndex: 0,
    },
  ],
  team: [
    {
      question: {
        en: "What matters most when completing a team mission?",
        vi: "Điều quan trọng nhất khi hoàn thành nhiệm vụ cùng đội?",
      },
      options: [
        { en: "Working alone silently", vi: "Làm một mình, im lặng" },
        { en: "Finishing first alone", vi: "Về đích một mình trước" },
        { en: "Communicating and supporting each other", vi: "Giao tiếp và hỗ trợ lẫn nhau" },
        { en: "Ignoring teammates", vi: "Bỏ qua đồng đội" },
      ],
      correctIndex: 2,
    },
    {
      question: {
        en: "If a teammate struggles, you should…",
        vi: "Nếu đồng đội gặp khó khăn, bạn nên…",
      },
      options: [
        { en: "Offer help and encouragement", vi: "Giúp đỡ và động viên" },
        { en: "Laugh at them", vi: "Cười nhạo họ" },
        { en: "Walk away", vi: "Bỏ đi" },
        { en: "Blame them publicly", vi: "Trách móc công khai" },
      ],
      correctIndex: 0,
    },
    {
      question: {
        en: "Good teamwork includes…",
        vi: "Làm việc nhóm tốt bao gồm…",
      },
      options: [
        { en: "Listening to everyone's ideas", vi: "Lắng nghe ý kiến mọi người" },
        { en: "Only one person decides everything", vi: "Chỉ một người quyết định tất cả" },
        { en: "Hiding information", vi: "Giấu thông tin" },
        { en: "Competing against your team", vi: "Cạnh tranh với chính đội mình" },
      ],
      correctIndex: 0,
    },
    {
      question: {
        en: "Before a group task, the team should…",
        vi: "Trước nhiệm vụ nhóm, đội nên…",
      },
      options: [
        { en: "Plan together and agree on roles", vi: "Cùng lên kế hoạch và phân vai" },
        { en: "Split up without talking", vi: "Tách ra không nói gì" },
        { en: "Skip planning", vi: "Bỏ qua kế hoạch" },
        { en: "Let one person do everything", vi: "Để một người làm hết" },
      ],
      correctIndex: 0,
    },
    {
      question: {
        en: "Team missions at camp teach you to…",
        vi: "Nhiệm vụ nhóm tại trại dạy bạn…",
      },
      options: [
        { en: "Collaborate and trust others", vi: "Hợp tác và tin tưởng người khác" },
        { en: "Avoid all group work", vi: "Tránh mọi việc nhóm" },
        { en: "Work only on phones", vi: "Chỉ làm trên điện thoại" },
        { en: "Ignore coaches", vi: "Bỏ qua huấn luyện viên" },
      ],
      correctIndex: 0,
    },
  ],
  nature: [
    {
      question: {
        en: "Why should we 'leave no trace' in the forest?",
        vi: "Tại sao nên 'không để lại dấu vết' trong rừng?",
      },
      options: [
        { en: "To hide from coaches", vi: "Để trốn huấn luyện viên" },
        { en: "To protect nature for wildlife and future campers", vi: "Bảo vệ thiên nhiên cho động vật và các đội sau" },
        { en: "Because photos are banned", vi: "Vì cấm chụp ảnh" },
        { en: "To lose XP", vi: "Để mất XP" },
      ],
      correctIndex: 1,
    },
    {
      question: {
        en: "What should you do with trash during the camp?",
        vi: "Bạn nên làm gì với rác trong trại?",
      },
      options: [
        { en: "Leave it on the ground", vi: "Vứt xuống đất" },
        { en: "Burn it anywhere", vi: "Đốt ở bất cứ đâu" },
        { en: "Collect it and dispose properly", vi: "Thu gom và xử lý đúng cách" },
        { en: "Hide it under rocks", vi: "Giấu dưới đá" },
      ],
      correctIndex: 2,
    },
    {
      question: {
        en: "When walking on trails, you should…",
        vi: "Khi đi trên đường mòn, bạn nên…",
      },
      options: [
        { en: "Stay on marked paths", vi: "Đi đúng lối đã đánh dấu" },
        { en: "Cut through plants", vi: "Cắt ngang qua cây cối" },
        { en: "Break branches for fun", vi: "Bẻ cành cho vui" },
        { en: "Disturb animal nests", vi: "Làm phiền tổ chim thú" },
      ],
      correctIndex: 0,
    },
    {
      question: {
        en: "Which action respects nature?",
        vi: "Hành động nào thể hiện tôn trọng thiên nhiên?",
      },
      options: [
        { en: "Picking rare flowers to take home", vi: "Hái hoa quý mang về nhà" },
        { en: "Observing wildlife from a distance", vi: "Quan sát động vật từ xa" },
        { en: "Feeding wild animals junk food", vi: "Cho động vật hoang ăn đồ vặt" },
        { en: "Carving names on trees", vi: "Khắc tên lên cây" },
      ],
      correctIndex: 1,
    },
    {
      question: {
        en: "A clean forest helps…",
        vi: "Rừng sạch giúp…",
      },
      options: [
        { en: "Only coaches", vi: "Chỉ huấn luyện viên" },
        { en: "The whole ecosystem stay healthy", vi: "Cả hệ sinh thái khỏe mạnh" },
        { en: "Nobody", vi: "Không ai cả" },
        { en: "Pollution increase", vi: "Tăng ô nhiễm" },
      ],
      correctIndex: 1,
    },
  ],
};

function localizeQuiz(item: BilingualQuiz, lang: Language): LocalizedQuiz {
  return {
    question: item.question[lang],
    options: item.options.map((o) => o[lang]) as LocalizedQuiz["options"],
    correctIndex: item.correctIndex,
  };
}

export function getRequirementQuizzes(reqIndex: number, lang: Language): LocalizedQuiz[] | null {
  const config = MISSION_REQUIREMENTS[reqIndex];
  if (!config || config.kind !== "quiz") return null;
  const bank = QUIZ_BANK[config.id];
  if (!bank) return null;
  return bank.map((q) => localizeQuiz(q, lang));
}

export function getRequirementKind(reqIndex: number): RequirementKind {
  return MISSION_REQUIREMENTS[reqIndex]?.kind ?? "quiz";
}
