import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, Crown, Star, Shield } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

const TIERS = [
  {
    id: "basic", name: "일반 회원", price: "30,000원", period: "/월",
    description: "협회 기본 서비스 이용",
    icon: Shield, color: "border-gray-300", badgeColor: "bg-gray-100 text-gray-700",
    features: ["게시판 및 커뮤니티 활동", "월간 협회 뉴스레터", "기본 술기 안내 자료", "이메일 문의 지원"],
    popular: false,
  },
  {
    id: "professional", name: "전문 회원", price: "80,000원", period: "/월",
    description: "전문 관리사 과정 포함",
    icon: Star, color: "border-blue-400", badgeColor: "bg-blue-100 text-blue-700",
    features: ["일반 회원 혜택 전체", "실기시험 응시 우선권", "1:1 전문 상담 (월 1회)", "자격검증 신속 처리", "전문 교육 자료 전체 열람"],
    popular: true,
  },
  {
    id: "master", name: "마스터 회원", price: "150,000원", period: "/월",
    description: "협회 최상위 등급",
    icon: Crown, color: "border-amber-400", badgeColor: "bg-amber-100 text-amber-700",
    features: ["전문 회원 혜택 전체", "무제한 실기시험 응시", "1:1 전문 상담 (주 1회)", "VIP 세미나 & 워크숍", "수료증 신속 발급", "협회 대외 활동 자격", "전담 지원 담당자"],
    popular: false,
  },
];

export default function Membership() {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (tierId: string) => {
    if (!isAuthenticated) { window.location.href = getLoginUrl(); return; }
    setLoading(tierId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tierId }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("결제 세션 생성 실패");
      const { checkoutUrl } = await res.json();
      window.location.href = checkoutUrl;
    } catch (err) {
      // Stripe 미설정 환경에서는 안내 메시지
      toast.info("결제 시스템 준비 중입니다. 관리자에게 문의해 주세요. (010-5318-3332)");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container flex items-center h-20 gap-3">
          <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition">
            <ArrowLeft className="w-4 h-4" /><span className="text-sm">홈으로</span>
          </a>
          <div className="w-px h-6 bg-border mx-1" />
          <h1 className="text-lg font-bold text-primary">멤버십 가입</h1>
        </div>
      </header>

      <div className="container py-16">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-primary mb-4">멤버십 플랜</h2>
          <p className="text-lg text-foreground/70">협회의 전문 서비스를 이용하는 가장 좋은 방법</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {TIERS.map(tier => (
            <Card key={tier.id} className={`p-8 relative border-2 ${tier.color} ${tier.popular ? "shadow-xl scale-105" : ""} hover:shadow-lg transition-all`}>
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">가장 인기</span>
                </div>
              )}
              <div className="text-center mb-6">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${tier.badgeColor}`}>
                  <tier.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-1">{tier.name}</h3>
                <p className="text-sm text-foreground/60 mb-4">{tier.description}</p>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-3xl font-bold text-primary">{tier.price}</span>
                  <span className="text-foreground/60 mb-1">{tier.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleSubscribe(tier.id)}
                disabled={loading === tier.id}
                className={`w-full ${tier.popular ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/90"}`}
              >
                {loading === tier.id ? "처리 중..." : "멤버십 가입"}
              </Button>
            </Card>
          ))}
        </div>

        {/* 안전 결제 안내 */}
        <div className="max-w-2xl mx-auto mt-14">
          <Card className="p-6 border-border/50">
            <h3 className="font-bold text-primary text-center mb-4">안전한 결제 보장</h3>
            <div className="grid grid-cols-3 gap-4 text-center text-sm text-foreground/70">
              <div><p className="font-semibold text-foreground">🔒 SSL 암호화</p><p>256-bit 보안</p></div>
              <div><p className="font-semibold text-foreground">💳 PCI DSS</p><p>국제 결제 표준</p></div>
              <div><p className="font-semibold text-foreground">↩️ 언제든 취소</p><p>위약금 없음</p></div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
