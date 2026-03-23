import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, Award, FileText, AlertCircle, ArrowLeft } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

const SKILLS = [
  { id: 1, name: "근골격 마사지", description: "근육 긴장 완화 및 혈액순환 개선 전문 기술", duration: "40시간", level: "기초", fee: "150,000원" },
  { id: 2, name: "관절 활성화 기술", description: "관절 유연성 증진 및 기능 회복 기술", duration: "50시간", level: "중급", fee: "200,000원" },
  { id: 3, name: "스포츠 회복 마사지", description: "운동 후 근육 회복 및 재활 치료 전문 과정", duration: "60시간", level: "고급", fee: "250,000원" },
  { id: 4, name: "맞춤형 통증 관리", description: "개인별 통증 분석 및 처방 전문 과정", duration: "45시간", level: "중급", fee: "180,000원" },
];

const MOCK_MY_EXAMS = [
  { id: 1, skillName: "근골격 마사지", status: "합격", date: "2026-03-10", score: 85 },
  { id: 2, skillName: "관절 활성화 기술", status: "진행중", date: "2026-03-20", score: null as number | null },
];

export default function SkillGuide() {
  const { isAuthenticated } = useAuth();
  const [myExams, setMyExams] = useState(MOCK_MY_EXAMS);
  const [showExamModal, setShowExamModal] = useState(false);
  const [examForm, setExamForm] = useState({ skillId: "1", date: "" });

  const handleApplyExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) { window.location.href = getLoginUrl(); return; }
    if (!examForm.date) { toast.error("시험 날짜를 선택하세요"); return; }
    const skill = SKILLS.find(s => s.id === Number(examForm.skillId));
    const newExam = { id: myExams.length + 1, skillName: skill?.name ?? "", status: "진행중", date: examForm.date, score: null };
    setMyExams([...myExams, newExam]);
    toast.success(`${skill?.name} 실기시험 신청 완료!`);
    setShowExamModal(false);
    setExamForm({ skillId: "1", date: "" });
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
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">SR</div>
            <h1 className="text-lg font-bold text-primary">술기 안내 및 시험</h1>
          </div>
          {isAuthenticated && (
            <Button onClick={() => setShowExamModal(true)} className="bg-secondary hover:bg-secondary/90">시험 신청</Button>
          )}
        </div>
      </header>

      <div className="container py-10">
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">술기 안내</TabsTrigger>
            <TabsTrigger value="exam">나의 시험</TabsTrigger>
            <TabsTrigger value="certification">자격검증 안내</TabsTrigger>
            <TabsTrigger value="certificate">수료증 안내</TabsTrigger>
          </TabsList>

          {/* 술기 안내 */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {SKILLS.map(skill => (
                <Card key={skill.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-primary">{skill.name}</h3>
                    <span className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full">{skill.level}</span>
                  </div>
                  <p className="text-foreground/70 mb-4 text-sm">{skill.description}</p>
                  <div className="flex items-center gap-4 text-sm text-foreground/60 mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{skill.duration}</span>
                    <span className="font-semibold text-secondary">{skill.fee}</span>
                  </div>
                  <Button onClick={() => { if (!isAuthenticated) { window.location.href = getLoginUrl(); return; } setExamForm({ ...examForm, skillId: String(skill.id) }); setShowExamModal(true); }}
                    className="w-full bg-secondary hover:bg-secondary/90">
                    실기시험 응시 신청
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 나의 시험 */}
          <TabsContent value="exam" className="mt-6 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-primary">나의 시험 이력</h2>
              <Button onClick={() => { if (!isAuthenticated) { window.location.href = getLoginUrl(); return; } setShowExamModal(true); }} className="bg-secondary hover:bg-secondary/90">새 시험 신청</Button>
            </div>
            {myExams.length === 0 ? (
              <Card className="p-12 text-center"><AlertCircle className="w-12 h-12 text-foreground/30 mx-auto mb-3" /><p className="text-foreground/60">응시한 시험이 없습니다.</p></Card>
            ) : myExams.map(exam => (
              <Card key={exam.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-primary">{exam.skillName}</h3>
                    <p className="text-sm text-foreground/60">신청일: {exam.date}</p>
                  </div>
                  <div className="text-right">
                    {exam.score !== null && <p className="text-xl font-bold text-primary mb-1">{exam.score}점</p>}
                    <span className={`px-3 py-1 rounded text-xs font-bold ${exam.status === "합격" ? "bg-green-100 text-green-800" : exam.status === "불합격" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>{exam.status}</span>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* 자격검증 안내 */}
          <TabsContent value="certification" className="mt-6 space-y-4">
            <Card className="p-6 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-blue-900 mb-3">자격검증 절차</h3>
                  <ol className="text-sm text-blue-800 space-y-2">
                    <li className="flex items-center gap-2"><span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">1</span> 실기시험 합격</li>
                    <li className="flex items-center gap-2"><span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">2</span> 자격검증 신청 (마이페이지)</li>
                    <li className="flex items-center gap-2"><span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">3</span> 협회 심사 (3~5 영업일)</li>
                    <li className="flex items-center gap-2"><span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">4</span> 자격 인증 완료 및 수료증 발급</li>
                  </ol>
                </div>
              </div>
            </Card>
            <Button onClick={() => window.location.href = isAuthenticated ? "/profile" : getLoginUrl()} className="w-full bg-secondary hover:bg-secondary/90">자격검증 신청하기</Button>
          </TabsContent>

          {/* 수료증 안내 */}
          <TabsContent value="certificate" className="mt-6 space-y-4">
            <Card className="p-6 bg-green-50 border-green-200">
              <div className="flex items-start gap-4">
                <Award className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-green-900 mb-3">수료증 발급 안내</h3>
                  <ul className="text-sm text-green-800 space-y-2">
                    <li>• 자격검증 완료 후 협회에서 공식 수료증 발급</li>
                    <li>• 수료증은 마이페이지에서 PDF 다운로드 가능</li>
                    <li>• 유효기간: 발급일로부터 3년 (갱신 가능)</li>
                    <li>• 재발급 신청: 협회 이메일 문의</li>
                  </ul>
                </div>
              </div>
            </Card>
            <Button onClick={() => window.location.href = isAuthenticated ? "/profile" : getLoginUrl()} className="w-full bg-secondary hover:bg-secondary/90">내 수료증 보기</Button>
          </TabsContent>
        </Tabs>
      </div>

      {/* 시험 신청 모달 */}
      {showExamModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white p-6">
            <h3 className="text-xl font-bold text-primary mb-5">실기시험 신청</h3>
            <form onSubmit={handleApplyExam} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">술기 선택</label>
                <select value={examForm.skillId} onChange={e => setExamForm({ ...examForm, skillId: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg">
                  {SKILLS.map(s => <option key={s.id} value={s.id}>{s.name} ({s.level})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">희망 시험 날짜</label>
                <input type="date" required value={examForm.date} onChange={e => setExamForm({ ...examForm, date: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg" />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1 bg-secondary hover:bg-secondary/90">신청하기</Button>
                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowExamModal(false)}>취소</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
