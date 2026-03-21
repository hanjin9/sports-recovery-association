import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Chrome, Apple } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Login() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();

  // 이미 로그인된 경우 홈으로 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, setLocation]);

  const handleGoogleLogin = () => {
    // Google OAuth 로그인
    console.log("Google 로그인 시도");
    // 실제 구현: window.location.href = getLoginUrl();
  };

  const handleKakaoLogin = () => {
    // Kakao OAuth 로그인
    console.log("Kakao 로그인 시도");
  };

  const handleAppleLogin = () => {
    // Apple OAuth 로그인
    console.log("Apple 로그인 시도");
  };

  const handleEmailLogin = () => {
    // 이메일 로그인
    console.log("이메일 로그인 시도");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      {/* 로그인 카드 */}
      <Card className="relative w-full max-w-md p-8 shadow-2xl border-primary/20">
        {/* 로고 */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg">
            SR
          </div>
          <h1 className="text-2xl font-bold text-primary text-center">SRMA</h1>
          <p className="text-sm text-muted-foreground text-center mt-2">
            스포츠 회복 관리사 협회
          </p>
          <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
            전문적인 마사지 술기와 회복 기술로 당신의 건강을 관리합니다
          </p>
        </div>

        {/* 구분선 */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-background text-muted-foreground">로그인</span>
          </div>
        </div>

        {/* 소셜 로그인 버튼 */}
        <div className="space-y-3 mb-6">
          {/* Google 로그인 */}
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full h-12 border-2 border-border hover:border-primary hover:bg-primary/5 transition-all"
          >
            <Chrome className="w-5 h-5 mr-2 text-blue-500" />
            <span className="font-medium">Google로 로그인</span>
          </Button>

          {/* Kakao 로그인 */}
          <Button
            onClick={handleKakaoLogin}
            variant="outline"
            className="w-full h-12 border-2 border-border hover:border-yellow-500 hover:bg-yellow-50 transition-all"
          >
            <div className="w-5 h-5 mr-2 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-white">
              K
            </div>
            <span className="font-medium">Kakao로 로그인</span>
          </Button>

          {/* Apple 로그인 */}
          <Button
            onClick={handleAppleLogin}
            variant="outline"
            className="w-full h-12 border-2 border-border hover:border-black hover:bg-black/5 transition-all"
          >
            <Apple className="w-5 h-5 mr-2 text-black" />
            <span className="font-medium">Apple로 로그인</span>
          </Button>

          {/* 이메일 로그인 */}
          <Button
            onClick={handleEmailLogin}
            className="w-full h-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-medium transition-all"
          >
            <Mail className="w-5 h-5 mr-2" />
            <span>이메일로 로그인</span>
          </Button>
        </div>

        {/* 약관 */}
        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          로그인하면 당사의{" "}
          <a href="#" className="text-primary hover:underline">
            이용약관
          </a>
          과{" "}
          <a href="#" className="text-primary hover:underline">
            개인정보 처리방침
          </a>
          에 동의하는 것입니다.
        </p>

        {/* 회원가입 링크 */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            계정이 없으신가요?{" "}
            <a href="#" className="text-primary font-medium hover:underline">
              회원가입
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}
