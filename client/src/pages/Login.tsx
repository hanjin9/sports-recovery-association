import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Chrome, Apple } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Login() {
  const [, setLocation] = useLocation();
  const [loginMethod, setLoginMethod] = useState<"social" | "phone">("social");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const handleGoogleLogin = () => {
    // 로컬 테스트용: 직접 쿠키 설정 (서버 세션이 없는 경우 프론트엔드 목업으로 동작할 수 있도록 함)
    document.cookie = "manus_session=test-session-id; path=/; max-age=31536000";
    localStorage.setItem("user", JSON.stringify({ 
      id: "google-user-1", 
      name: "Google User", 
      email: "user@google.com",
      provider: "google"
    }));
    setLocation("/");
    // 페이지 새로고침하여 인증 상태 반영
    window.location.reload();
  };

  const handleKakaoLogin = () => {
    localStorage.setItem("user", JSON.stringify({ 
      id: "kakao-user-1", 
      name: "Kakao User", 
      email: "user@kakao.com",
      provider: "kakao"
    }));
    setLocation("/");
  };

  const handleAppleLogin = () => {
    localStorage.setItem("user", JSON.stringify({ 
      id: "apple-user-1", 
      name: "Apple User", 
      email: "user@apple.com",
      provider: "apple"
    }));
    setLocation("/");
  };

  const handleEmailLogin = () => {
    localStorage.setItem("user", JSON.stringify({ 
      id: "email-user-1", 
      name: "Email User", 
      email: "user@email.com",
      provider: "email"
    }));
    setLocation("/");
  };

  const handleSendVerificationCode = () => {
    if (!phoneNumber) {
      alert("휴대폰 번호를 입력해주세요");
      return;
    }
    alert(`인증 코드가 ${phoneNumber}로 발송되었습니다.\n테스트: 인증 코드는 123456입니다.`);
  };

  const handleVerifyCode = () => {
    if (verificationCode === "123456") {
      setIsPhoneVerified(true);
      localStorage.setItem("user", JSON.stringify({ 
        id: "phone-user-1", 
        name: "Phone User", 
        phone: phoneNumber,
        provider: "phone"
      }));
      setTimeout(() => setLocation("/"), 500);
    } else {
      alert("인증 코드가 일치하지 않습니다");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">SR SRMA</h1>
          <p className="text-foreground/60">스포츠 회복 관리사 협회</p>
        </div>

        <div className="flex gap-4 mb-6">
          <Button
            variant={loginMethod === "social" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setLoginMethod("social")}
          >
            소셜 로그인
          </Button>
          <Button
            variant={loginMethod === "phone" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setLoginMethod("phone")}
          >
            휴대폰 인증
          </Button>
        </div>

        {loginMethod === "social" && (
          <Card className="p-8 border-border/50 bg-white">
            <h2 className="text-xl font-bold text-primary mb-6 text-center">소셜 로그인</h2>
            
            <div className="space-y-4">
              <Button
                onClick={handleGoogleLogin}
                className="w-full bg-white text-foreground border border-border hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <Chrome className="w-5 h-5" />
                Google로 로그인
              </Button>

              <Button
                onClick={handleKakaoLogin}
                className="w-full bg-yellow-300 text-black hover:bg-yellow-400 flex items-center justify-center gap-2"
              >
                <span className="w-5 h-5 font-bold">K</span>
                Kakao로 로그인
              </Button>

              <Button
                onClick={handleAppleLogin}
                className="w-full bg-black text-white hover:bg-gray-900 flex items-center justify-center gap-2"
              >
                <Apple className="w-5 h-5" />
                Apple로 로그인
              </Button>

              <Button
                onClick={handleEmailLogin}
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Email로 로그인
              </Button>
            </div>
          </Card>
        )}

        {loginMethod === "phone" && (
          <Card className="p-8 border-border/50 bg-white">
            <h2 className="text-xl font-bold text-primary mb-6 text-center">휴대폰 인증</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">휴대폰 번호</label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    placeholder="010-1234-5678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={isPhoneVerified}
                    className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary disabled:bg-gray-100"
                  />
                  <Button
                    onClick={handleSendVerificationCode}
                    disabled={isPhoneVerified}
                    className="bg-secondary hover:bg-secondary/90"
                  >
                    인증
                  </Button>
                </div>
              </div>

              {phoneNumber && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">인증 코드</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="인증 코드 입력"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      disabled={isPhoneVerified}
                      className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary disabled:bg-gray-100"
                    />
                    <Button
                      onClick={handleVerifyCode}
                      disabled={isPhoneVerified}
                      className="bg-secondary hover:bg-secondary/90"
                    >
                      확인
                    </Button>
                  </div>
                  <p className="text-xs text-foreground/60 mt-2">테스트 코드: 123456</p>
                </div>
              )}

              {isPhoneVerified && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                  <p className="text-green-700 font-medium">✓ 인증이 완료되었습니다</p>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
