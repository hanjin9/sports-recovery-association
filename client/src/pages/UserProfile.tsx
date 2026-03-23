import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, FileText, CheckCircle, Download, User, ArrowLeft, Calendar, CreditCard } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const MOCK_EXAMS = [
  { id: 1, skillName: "근골격 마사지", examDate: "2026-03-10", score: 85, status: "합격" },
  { id: 2, skillName: "관절 활성화", examDate: "2026-03-15", score: 92, status: "합격" },
  { id: 3, skillName: "스포츠 회복 마사지", examDate: "2026-03-20", score: null as number | null, status: "진행중" },
];
const MOCK_CERTIFICATIONS = [
  { id: 1, skillName: "근골격 마사지", certDate: "2026-03-12", certNumber: "SRMA-2026-001", status: "인증완료" },
];
const MOCK_CERTIFICATES = [
  { id: 1, skillName: "근골격 마사지", issueDate: "2026-03-12", certNumber: "SRMA-2026-001" },
];
const MOCK_APPOINTMENTS = [
  { id: 1, practitionerName: "김유찬", date: "2026-03-25", time: "10:00", status: "confirmed", type: "일반 상담" },
];
const MOCK_MEMBERSHIP = { tier: "professional", tierName: "전문 회원", status: "active", renewalDate: "2026-04-23", amount: "80,000원" };

export default function UserProfile() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center max-w-sm w-full">
          <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-2">로그인 필요</h2>
          <p className="text-foreground/60 mb-6">마이페이지를 보려면 로그인해야 합니다.</p>
          <Button onClick={() => window.location.href = getLoginUrl()} className="w-full bg-secondary hover:bg-secondary/90">로그인하기</Button>
          <Button onClick={() => window.location.href = "/"} variant="outline" className="w-full mt-3">홈으로</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition">
              <ArrowLeft className="w-4 h-4" /><span className="text-sm">홈으로</span>
            </a>
            <div className="w-px h-6 bg-border mx-1" />
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white"><User className="w-5 h-5" /></div>
            <h1 className="text-lg font-bold text-primary">마이페이지</h1>
          </div>
          <Button size="sm" variant="outline" onClick={logout}>로그아웃</Button>
        </div>
      </header>

      <div className="container py-10">
        {/* 프로필 카드 */}
        <Card className="p-8 mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-none">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md">
                {user?.name?.charAt(0) ?? "U"}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary">{user?.name ?? "회원"}</h2>
                <p className="text-foreground/60 text-sm mt-1">{user?.email ?? "-"}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${user?.role === "admin" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>
                    {user?.role === "admin" ? "관리자" : "일반회원"}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                    {MOCK_MEMBERSHIP.tierName}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => window.location.href = "/appointments"} size="sm" className="bg-secondary hover:bg-secondary/90">
                <Calendar className="w-4 h-4 mr-1" /> 상담 예약
              </Button>
              <Button onClick={() => window.location.href = "/membership"} size="sm" variant="outline">
                <CreditCard className="w-4 h-4 mr-1" /> 멤버십
              </Button>
            </div>
          </div>
        </Card>

        {/* 통계 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: CheckCircle, label: "응시 시험", value: MOCK_EXAMS.length, color: "text-blue-500" },
            { icon: Award, label: "자격검증", value: MOCK_CERTIFICATIONS.length, color: "text-yellow-500" },
            { icon: FileText, label: "수료증", value: MOCK_CERTIFICATES.length, color: "text-green-500" },
            { icon: Calendar, label: "예약 현황", value: MOCK_APPOINTMENTS.length, color: "text-purple-500" },
          ].map((s, i) => (
            <Card key={i} className="p-5 text-center">
              <s.icon className={`w-8 h-8 mx-auto mb-2 ${s.color}`} />
              <p className="text-xs text-foreground/60 mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-primary">{s.value}</p>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="exams">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="exams">시험 이력</TabsTrigger>
            <TabsTrigger value="certifications">자격검증</TabsTrigger>
            <TabsTrigger value="certificates">수료증</TabsTrigger>
            <TabsTrigger value="appointments">예약 현황</TabsTrigger>
            <TabsTrigger value="membership">멤버십</TabsTrigger>
          </TabsList>

          <TabsContent value="exams" className="space-y-4 mt-6">
            {MOCK_EXAMS.map(exam => (
              <Card key={exam.id} className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-primary">{exam.skillName}</h3>
                  <p className="text-sm text-foreground/60">응시일: {exam.examDate}</p>
                </div>
                <div className="text-right">
                  {exam.score !== null && <p className="text-2xl font-bold text-primary mb-1">{exam.score}점</p>}
                  <span className={`px-3 py-1 rounded text-xs font-bold ${exam.status === "합격" ? "bg-green-100 text-green-800" : exam.status === "불합격" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>{exam.status}</span>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="certifications" className="space-y-4 mt-6">
            {MOCK_CERTIFICATIONS.map(cert => (
              <Card key={cert.id} className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-primary">{cert.skillName}</h3>
                  <p className="text-sm text-foreground/60">인증일: {cert.certDate}</p>
                  <p className="text-xs text-foreground/40 mt-1">인증번호: {cert.certNumber}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="certificates" className="space-y-4 mt-6">
            {MOCK_CERTIFICATES.map(cert => (
              <Card key={cert.id} className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-primary">{cert.skillName}</h3>
                  <p className="text-sm text-foreground/60">발급일: {cert.issueDate}</p>
                  <p className="text-xs text-foreground/40 mt-1">수료증 번호: {cert.certNumber}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => alert("수료증 다운로드 기능 준비 중입니다.")} className="flex items-center gap-2">
                  <Download className="w-4 h-4" /> 다운로드
                </Button>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4 mt-6">
            {MOCK_APPOINTMENTS.map(apt => (
              <Card key={apt.id} className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-primary">{apt.practitionerName} 관리사</h3>
                  <p className="text-sm text-foreground/60">{apt.date} {apt.time} | {apt.type}</p>
                </div>
                <span className={`px-3 py-1 rounded text-xs font-bold ${apt.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                  {apt.status === "confirmed" ? "확정" : "대기"}
                </span>
              </Card>
            ))}
            <Button onClick={() => window.location.href = "/appointments"} className="w-full bg-secondary hover:bg-secondary/90">새 상담 예약</Button>
          </TabsContent>

          <TabsContent value="membership" className="mt-6">
            <Card className="p-6">
              <h3 className="font-bold text-primary text-lg mb-4">현재 멤버십</h3>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold text-primary">{MOCK_MEMBERSHIP.tierName}</p>
                  <p className="text-sm text-foreground/60 mt-1">다음 갱신: {MOCK_MEMBERSHIP.renewalDate}</p>
                  <p className="text-sm text-foreground/60">월 {MOCK_MEMBERSHIP.amount}</p>
                </div>
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold">활성</span>
              </div>
              <div className="flex gap-3 mt-6">
                <Button onClick={() => window.location.href = "/membership"} className="flex-1 bg-primary hover:bg-primary/90">플랜 변경</Button>
                <Button variant="outline" className="flex-1 text-red-600 border-red-200 hover:bg-red-50">구독 취소</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {user?.role === "admin" && (
          <Card className="mt-8 p-6 border-red-200 bg-red-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-red-700">관리자 전용</h3>
                <p className="text-sm text-red-500">관리자 대시보드 접근 가능</p>
              </div>
              <Button onClick={() => window.location.href = "/admin"} className="bg-red-600 hover:bg-red-700 text-white">관리자 패널</Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
