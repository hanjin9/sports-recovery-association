import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export default function PaymentSuccess() {
  const [, navigate] = useLocation();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (!sessionId) { setStatus("error"); return; }

    fetch(`/api/stripe/verify-session?session_id=${sessionId}`, { credentials: "include" })
      .then(r => r.json())
      .then(data => { if (data.success) { setOrderDetails(data.order); setStatus("success"); } else setStatus("error"); })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <Loader2 className="animate-spin mx-auto mb-4 text-primary w-12 h-12" />
        <p className="text-foreground/70">결제 확인 중...</p>
      </div>
    </div>
  );

  if (status === "error") return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-lg mx-auto">
        <Card className="p-8 text-center border-red-200">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-2">결제 확인 실패</h2>
          <p className="text-foreground/60 mb-6">결제 정보를 확인할 수 없습니다. 관리자에게 문의해 주세요.</p>
          <div className="flex gap-3">
            <Button onClick={() => navigate("/membership")} className="flex-1 bg-primary hover:bg-primary/90">다시 시도</Button>
            <Button onClick={() => navigate("/")} variant="outline" className="flex-1">홈으로</Button>
          </div>
        </Card>
      </div>
    </div>
  );

  const tierNames: Record<string, string> = { basic: "일반 회원", professional: "전문 회원", master: "마스터 회원" };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="container max-w-lg mx-auto">
        <Card className="p-8 border-green-200 shadow-xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-green-600 mb-1">결제 완료!</h2>
            <p className="text-foreground/60">멤버십이 활성화되었습니다 🎉</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 mb-6 space-y-3">
            <h3 className="font-bold text-primary mb-3">구독 정보</h3>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">플랜</span>
              <span className="font-semibold">{tierNames[orderDetails?.tier_id] ?? orderDetails?.tier_id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">금액</span>
              <span className="font-semibold">{orderDetails?.amount?.toLocaleString()}원</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-blue-800">
            <p className="font-semibold mb-1">📧 확인 이메일 발송 완료</p>
            <p>결제 확인 이메일이 발송되었습니다. 스팸함도 확인해 주세요.</p>
          </div>

          <div className="space-y-3">
            <Button onClick={() => navigate("/profile")} className="w-full bg-primary hover:bg-primary/90">
              마이페이지에서 확인 <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button onClick={() => navigate("/appointments")} variant="outline" className="w-full">상담 예약하기</Button>
            <Button onClick={() => navigate("/")} variant="ghost" className="w-full text-foreground/60">홈으로</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
