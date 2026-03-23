// ─── 스포츠 회복 관리사 협회 멤버십 등급 ─────────────────────

export const MEMBERSHIP_TIERS = {
  BASIC: {
    id: "basic",
    name: "일반 회원",
    description: "협회 기본 서비스 이용",
    priceInWon: 30000,
    priceDisplay: "30,000원/월",
    stripePriceId: process.env.STRIPE_PRICE_BASIC || "price_basic_placeholder",
    features: [
      "게시판 및 커뮤니티 활동",
      "월간 협회 뉴스레터",
      "기본 술기 안내 자료",
      "이메일 문의 지원",
    ],
    color: "#6b7280",
    badge: "BASIC",
  },
  PROFESSIONAL: {
    id: "professional",
    name: "전문 회원",
    description: "전문 관리사 과정 포함",
    priceInWon: 80000,
    priceDisplay: "80,000원/월",
    stripePriceId: process.env.STRIPE_PRICE_PROFESSIONAL || "price_professional_placeholder",
    features: [
      "일반 회원 혜택 전체 포함",
      "실기시험 응시 우선권",
      "1:1 전문 관리사 상담 (월 1회)",
      "자격검증 신속 처리",
      "전문 교육 자료 전체 열람",
    ],
    color: "#0ea5e9",
    badge: "PRO",
  },
  MASTER: {
    id: "master",
    name: "마스터 회원",
    description: "협회 최상위 등급",
    priceInWon: 150000,
    priceDisplay: "150,000원/월",
    stripePriceId: process.env.STRIPE_PRICE_MASTER || "price_master_placeholder",
    features: [
      "전문 회원 혜택 전체 포함",
      "무제한 실기시험 응시",
      "1:1 전문 관리사 상담 (주 1회)",
      "VIP 세미나 & 워크숍 참가",
      "수료증 신속 발급",
      "협회 대외 활동 참여 자격",
      "전담 지원 담당자 배정",
    ],
    color: "#f59e0b",
    badge: "MASTER",
  },
};

export const getAllTiers = () => Object.values(MEMBERSHIP_TIERS);
export const getTierById = (id: string) => Object.values(MEMBERSHIP_TIERS).find(t => t.id === id);
