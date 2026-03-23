import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { useEffect } from "react";
import { Dumbbell } from "lucide-react";

export default function Login() {
  const { isAuthenticated } = useAuth();

  // 이미 로그인 상태면 홈으로
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/";
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 로고 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
            <Dumbbell className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-primary">SRMA</h1>
          <p className="text-muted-foreground mt-1">스포츠 회복 관리사 협회</p>
        </div>

        <Card className="p-8 shadow-xl border-border/50">
          <h2 className="text-2xl font-bold text-primary text-center mb-2">로그인</h2>
          <p className="text-center text-muted-foreground text-sm mb-8">
            협회 회원 전용 서비스입니다
          </p>

          <div className="space-y-4">
            <Button
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white text-base font-semibold"
              onClick={() => window.location.href = getLoginUrl()}
            >
              회원 로그인
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">또는</span>
              </div>
            </div>

            {/* 개발/테스트용 가상 계정 안내 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-xs font-semibold text-blue-700 mb-2">🧪 테스트 계정 (개발용)</p>
              <div className="space-y-1 text-xs text-blue-600">
                <p>관리자: admin@srma.kr / test1234</p>
                <p>일반회원: user@srma.kr / test1234</p>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            아직 회원이 아니신가요?{" "}
            <a href="#" className="text-primary font-medium hover:underline">회원가입 문의</a>
          </p>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © 2026 스포츠 회복 관리사 협회. All rights reserved.
        </p>
      </div>
    </div>
  );
}
