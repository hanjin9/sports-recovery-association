import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, User, MapPin, Phone, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const MOCK_PRACTITIONERS = [
  { id: 1, name: "김유찬", title: "협회 회장 & 수석 관리사", specialty: "근골격 마사지 & 스포츠 회복", experience: 15, bio: "15년 이상의 스포츠 회복 전문 경험으로 수많은 선수와 일반인의 회복을 도왔습니다.", email: "kyc116116@gmail.com", phone: "010-5318-3332", imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663351563633/2BPpRBXCnBZ6CCnqv7Cgqp/about-professional-team-gaujQ8xoQeyPcCz8k6qyrC.webp" },
  { id: 2, name: "박준호", title: "전문 관리사", specialty: "관절 활성화 & 통증 관리", experience: 12, bio: "관절 기능 회복과 만성 통증 관리 분야 전문가입니다.", email: "park@srma.kr", phone: "010-1234-5678", imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663351563633/2BPpRBXCnBZ6CCnqv7Cgqp/service-joint-activation-cU5LmcTPErnav5KPbx7ZqH.webp" },
  { id: 3, name: "이수진", title: "스포츠 회복 전문가", specialty: "스포츠 부상 재활 & 회복", experience: 10, bio: "스포츠 선수 전문 재활 트레이너 출신으로 부상 후 빠른 복귀를 돕습니다.", email: "lee@srma.kr", phone: "010-9876-5432", imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663351563633/2BPpRBXCnBZ6CCnqv7Cgqp/service-massage-technique-adprBs8CryPqmiGmVGZsLS.webp" },
  { id: 4, name: "최민준", title: "웰니스 상담사", specialty: "맞춤형 통증 분석 & 처방", experience: 8, bio: "개인별 맞춤 통증 분석으로 근본적인 원인을 찾아 치료합니다.", email: "choi@srma.kr", phone: "010-5555-3333", imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663351563633/2BPpRBXCnBZ6CCnqv7Cgqp/hero-premium-massage-g64gaUaLmMnwzE6AEoDQLU.webp" },
];

const TIME_SLOTS = [
  { time: "09:00", available: true }, { time: "10:00", available: true },
  { time: "11:00", available: false }, { time: "13:00", available: true },
  { time: "14:00", available: true }, { time: "15:00", available: true },
  { time: "16:00", available: false }, { time: "17:00", available: true },
];

const CONSULTATION_TYPES = [
  { value: "general", label: "일반 상담" },
  { value: "sports", label: "스포츠 부상 상담" },
  { value: "chronic", label: "만성 통증 상담" },
  { value: "followup", label: "추후 방문 상담" },
];

// 가상 예약 내역
const MOCK_MY_APPOINTMENTS = [
  { id: 1, practitionerName: "김유찬", date: "2026-03-25", time: "10:00", status: "confirmed", consultationType: "일반 상담" },
];

export default function Appointments() {
  const { isAuthenticated } = useAuth();
  const [selected, setSelected] = useState<any>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("general");
  const [myAppointments, setMyAppointments] = useState(MOCK_MY_APPOINTMENTS);
  const [booking, setBooking] = useState(false);
  const [step, setStep] = useState<"select" | "confirm">("select");

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 max-w-md text-center">
          <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-2">로그인 필요</h2>
          <p className="text-foreground/60 mb-6">상담 예약을 위해 로그인해주세요.</p>
          <Button onClick={() => window.location.href = getLoginUrl()} className="w-full bg-secondary hover:bg-secondary/90">로그인하기</Button>
          <Button onClick={() => window.location.href = "/"} variant="outline" className="w-full mt-3">홈으로</Button>
        </Card>
      </div>
    );
  }

  const handleBook = () => {
    if (!selected || !date || !time) { toast.error("관리사, 날짜, 시간을 모두 선택해주세요"); return; }
    setBooking(true);
    setTimeout(() => {
      const typeLabel = CONSULTATION_TYPES.find(t => t.value === type)?.label ?? type;
      setMyAppointments([...myAppointments, { id: myAppointments.length + 1, practitionerName: selected.name, date, time, status: "scheduled", consultationType: typeLabel }]);
      toast.success(`${selected.name} 관리사와의 상담이 예약되었습니다!`);
      setSelected(null); setDate(""); setTime(""); setType("general"); setStep("select"); setBooking(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container flex items-center h-20 gap-3">
          <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition">
            <ArrowLeft className="w-4 h-4" /><span className="text-sm">홈으로</span>
          </a>
          <div className="w-px h-6 bg-border mx-1" />
          <h1 className="text-lg font-bold text-primary">전문 관리사 상담 예약</h1>
        </div>
      </header>

      <div className="container py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 메인 예약 폼 */}
          <div className="lg:col-span-2 space-y-6">

            {/* 관리사 선택 */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-primary mb-5">① 관리사 선택</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {MOCK_PRACTITIONERS.map(p => (
                  <div key={p.id} onClick={() => setSelected(p)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selected?.id === p.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                    <div className="flex gap-3">
                      <img src={p.imageUrl} alt={p.name} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                      <div>
                        <p className="font-bold text-primary">{p.name}</p>
                        <p className="text-xs text-foreground/60">{p.title}</p>
                        <p className="text-xs text-secondary mt-1">경력 {p.experience}년 | {p.specialty}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* 선택된 관리사 상세 */}
            {selected && (
              <Card className="p-6 border-primary/30 bg-primary/5">
                <h3 className="font-bold text-primary mb-3">{selected.name} — 상세 정보</h3>
                <p className="text-sm text-foreground/70 mb-3">{selected.bio}</p>
                <div className="flex gap-6 text-sm text-foreground/60">
                  <span className="flex items-center gap-1"><Mail className="w-4 h-4" />{selected.email}</span>
                  <span className="flex items-center gap-1"><Phone className="w-4 h-4" />{selected.phone}</span>
                </div>
              </Card>
            )}

            {/* 날짜 & 시간 선택 */}
            {selected && (
              <Card className="p-6">
                <h2 className="text-xl font-bold text-primary mb-5">② 날짜 & 시간 선택</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">상담 날짜</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">상담 시간</label>
                    <div className="grid grid-cols-4 gap-2">
                      {TIME_SLOTS.map(slot => (
                        <button key={slot.time} disabled={!slot.available} onClick={() => setTime(slot.time)}
                          className={`py-2 rounded-lg text-sm font-medium transition-all ${time === slot.time ? "bg-primary text-white" : slot.available ? "bg-muted hover:bg-primary/10 text-foreground" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}>
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">상담 유형</label>
                    <select value={type} onChange={e => setType(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30">
                      {CONSULTATION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  <Button onClick={handleBook} disabled={booking || !date || !time}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-3 font-semibold">
                    {booking ? "예약 처리 중..." : "상담 예약 확정"}
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* 사이드바 — 예약 현황 */}
          <div>
            <Card className="p-6">
              <h2 className="text-lg font-bold text-primary mb-4">나의 예약 현황</h2>
              {myAppointments.length === 0 ? (
                <p className="text-foreground/60 text-center py-8 text-sm">예약된 상담이 없습니다.</p>
              ) : (
                <div className="space-y-3">
                  {myAppointments.map(apt => (
                    <div key={apt.id} className="p-4 bg-muted rounded-xl">
                      <p className="font-bold text-primary text-sm mb-2">{apt.practitionerName}</p>
                      <div className="space-y-1 text-xs text-foreground/60">
                        <div className="flex items-center gap-1"><Calendar className="w-3 h-3" />{apt.date}</div>
                        <div className="flex items-center gap-1"><Clock className="w-3 h-3" />{apt.time}</div>
                        <div className="flex items-center gap-1"><User className="w-3 h-3" />{apt.consultationType}</div>
                      </div>
                      <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-bold ${apt.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                        {apt.status === "confirmed" ? "확정" : "예약됨"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl text-xs text-blue-700">
                <p className="font-semibold mb-1">📌 예약 안내</p>
                <p>• 예약 시간 15분 전 도착</p>
                <p>• 취소/변경: 24시간 전 연락</p>
                <p>• 문의: 010-5318-3332</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
