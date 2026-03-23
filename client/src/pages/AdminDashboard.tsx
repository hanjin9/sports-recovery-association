import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, FileText, Users, Award, ArrowLeft, CalendarCheck } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

const MOCK_EXAMS = [
  { id: 1, candidateName: "박준호", skillName: "근골격 마사지", status: "진행중", submittedDate: "2026-03-17", score: null as number | null },
  { id: 2, candidateName: "이수진", skillName: "관절 활성화", status: "진행중", submittedDate: "2026-03-16", score: null as number | null },
  { id: 3, candidateName: "최민준", skillName: "스포츠 회복 마사지", status: "합격", submittedDate: "2026-03-10", score: 92 },
  { id: 4, candidateName: "김지영", skillName: "맞춤형 통증 관리", status: "불합격", submittedDate: "2026-03-08", score: 54 },
];
const MOCK_CERTS = [
  { id: 1, candidateName: "김민지", skillName: "스포츠 회복 마사지", requestDate: "2026-03-15" },
  { id: 2, candidateName: "장우혁", skillName: "근골격 마사지", requestDate: "2026-03-14" },
];
const MOCK_ISSUED = [
  { id: 1, candidateName: "최준영", skillName: "관절 활성화", certNumber: "SRMA-2026-001", issueDate: "2026-03-12" },
  { id: 2, candidateName: "오세진", skillName: "근골격 마사지", certNumber: "SRMA-2026-002", issueDate: "2026-03-09" },
];
const MOCK_RESERVATIONS = [
  { id: 1, name: "홍길동", email: "hong@test.kr", phone: "010-1234-5678", date: "2026-03-25", status: "pending" },
  { id: 2, name: "김철수", email: "kim@test.kr", phone: "010-9876-5432", date: "2026-03-26", status: "confirmed" },
  { id: 3, name: "이영희", email: "lee@test.kr", phone: "010-5555-4444", date: "2026-03-28", status: "pending" },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [exams, setExams] = useState(MOCK_EXAMS);
  const [certifications, setCertifications] = useState(MOCK_CERTS);
  const [issuedCerts, setIssuedCerts] = useState(MOCK_ISSUED);
  const [reservations, setReservations] = useState(MOCK_RESERVATIONS);
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [scoreForm, setScoreForm] = useState({ score: "", result: "합격" });
  const [certForm, setCertForm] = useState({ certNumber: "", issueDate: new Date().toISOString().split("T")[0] });

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">로그인 필요</h2>
          <p className="text-foreground/60 mb-4">관리자 페이지는 로그인이 필요합니다.</p>
          <Button onClick={() => window.location.href = "/login"} className="bg-secondary hover:bg-secondary/90">로그인하기</Button>
        </Card>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">접근 권한 없음</h2>
          <p className="text-foreground/60 mb-4">관리자만 접근할 수 있습니다.</p>
          <Button onClick={() => window.location.href = "/"} variant="outline">홈으로 돌아가기</Button>
        </Card>
      </div>
    );
  }

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scoreForm.score) { toast.error("점수를 입력하세요"); return; }
    setExams(exams.map(e => e.id === selectedExam.id ? { ...e, status: scoreForm.result, score: Number(scoreForm.score) } : e));
    toast.success(`${selectedExam.candidateName} 채점 완료 — ${scoreForm.result}`);
    setSelectedExam(null);
    setScoreForm({ score: "", result: "합격" });
  };

  const handleIssueCert = (cert: any) => {
    if (!certForm.certNumber) { toast.error("수료증 번호를 입력하세요"); return; }
    setIssuedCerts([{ id: issuedCerts.length + 1, candidateName: cert.candidateName, skillName: cert.skillName, certNumber: certForm.certNumber, issueDate: certForm.issueDate }, ...issuedCerts]);
    setCertifications(certifications.filter(c => c.id !== cert.id));
    toast.success(`${cert.candidateName} 수료증 발급 완료`);
    setCertForm({ certNumber: "", issueDate: new Date().toISOString().split("T")[0] });
  };

  const handleReservationStatus = (id: number, status: string) => {
    setReservations(reservations.map(r => r.id === id ? { ...r, status } : r));
    toast.success(status === "confirmed" ? "예약 확정되었습니다" : "예약 취소되었습니다");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition">
              <ArrowLeft className="w-4 h-4" /><span className="text-sm">홈으로</span>
            </a>
            <div className="w-px h-6 bg-border mx-1" />
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">AD</div>
            <h1 className="text-lg font-bold text-primary">관리자 대시보드</h1>
          </div>
          <span className="text-sm text-muted-foreground">관리자: {user.name}</span>
        </div>
      </header>

      <div className="container py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "채점 대기", value: exams.filter(e => e.status === "진행중").length },
            { label: "자격검증 대기", value: certifications.length },
            { label: "발급된 수료증", value: issuedCerts.length },
            { label: "예약 대기", value: reservations.filter(r => r.status === "pending").length },
          ].map((s, i) => (
            <Card key={i} className="p-5">
              <p className="text-sm text-foreground/60 mb-1">{s.label}</p>
              <p className="text-3xl font-bold text-primary">{s.value}</p>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="exams">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="exams">시험 채점</TabsTrigger>
            <TabsTrigger value="certifications">자격검증</TabsTrigger>
            <TabsTrigger value="certificates">수료증 현황</TabsTrigger>
            <TabsTrigger value="reservations">예약 관리</TabsTrigger>
          </TabsList>

          <TabsContent value="exams" className="space-y-4 mt-6">
            {exams.map(exam => (
              <Card key={exam.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-primary">{exam.candidateName}</h3>
                    <p className="text-sm text-foreground/60">{exam.skillName} | 제출: {exam.submittedDate}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {exam.score !== null && <span className="text-lg font-bold">{exam.score}점</span>}
                    <span className={`px-3 py-1 rounded text-xs font-bold ${exam.status === "진행중" ? "bg-yellow-100 text-yellow-800" : exam.status === "합격" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{exam.status}</span>
                    {exam.status === "진행중" && <Button size="sm" onClick={() => setSelectedExam(exam)} className="bg-secondary hover:bg-secondary/90">채점</Button>}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="certifications" className="space-y-4 mt-6">
            {certifications.length === 0 ? <Card className="p-12 text-center"><p className="text-foreground/60">대기 중인 자격검증이 없습니다.</p></Card>
              : certifications.map(cert => (
                <Card key={cert.id} className="p-6">
                  <div className="mb-3">
                    <h3 className="font-bold text-primary">{cert.candidateName}</h3>
                    <p className="text-sm text-foreground/60">{cert.skillName} | 신청: {cert.requestDate}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input type="text" placeholder="수료증 번호 (SRMA-2026-XXX)" value={certForm.certNumber} onChange={e => setCertForm({ ...certForm, certNumber: e.target.value })} className="px-3 py-2 border border-border rounded-lg text-sm" />
                    <input type="date" value={certForm.issueDate} onChange={e => setCertForm({ ...certForm, issueDate: e.target.value })} className="px-3 py-2 border border-border rounded-lg text-sm" />
                  </div>
                  <Button onClick={() => handleIssueCert(cert)} className="w-full bg-secondary hover:bg-secondary/90">수료증 발급</Button>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="certificates" className="space-y-4 mt-6">
            {issuedCerts.length === 0 ? <Card className="p-12 text-center"><p className="text-foreground/60">발급된 수료증이 없습니다.</p></Card>
              : issuedCerts.map(cert => (
                <Card key={cert.id} className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-primary">{cert.candidateName}</h3>
                    <p className="text-sm text-foreground/60">{cert.skillName}</p>
                    <p className="text-xs text-foreground/40 mt-1">{cert.certNumber} | {cert.issueDate}</p>
                  </div>
                  <CheckCircle className="w-7 h-7 text-green-500" />
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="reservations" className="space-y-4 mt-6">
            {reservations.map(res => (
              <Card key={res.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-primary">{res.name}</h3>
                    <p className="text-sm text-foreground/60">{res.phone} | {res.email}</p>
                    <p className="text-xs text-foreground/40 mt-1">예약일: {res.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${res.status === "confirmed" ? "bg-green-100 text-green-800" : res.status === "cancelled" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {res.status === "confirmed" ? "확정" : res.status === "cancelled" ? "취소" : "대기"}
                    </span>
                    {res.status === "pending" && <>
                      <Button size="sm" onClick={() => handleReservationStatus(res.id, "confirmed")} className="bg-green-600 hover:bg-green-700 text-white">확정</Button>
                      <Button size="sm" variant="outline" onClick={() => handleReservationStatus(res.id, "cancelled")}>취소</Button>
                    </>}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {selectedExam && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white p-6">
            <h3 className="text-xl font-bold text-primary mb-1">시험 채점</h3>
            <p className="text-sm text-foreground/60 mb-5">{selectedExam.candidateName} — {selectedExam.skillName}</p>
            <form onSubmit={handleGradeSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">점수 (0~100)</label>
                <input type="number" min="0" max="100" required value={scoreForm.score} onChange={e => setScoreForm({ ...scoreForm, score: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg text-lg font-bold" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">판정</label>
                <select value={scoreForm.result} onChange={e => setScoreForm({ ...scoreForm, result: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg">
                  <option value="합격">합격</option>
                  <option value="불합격">불합격</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1 bg-secondary hover:bg-secondary/90">저장</Button>
                <Button type="button" variant="outline" className="flex-1" onClick={() => setSelectedExam(null)}>취소</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
