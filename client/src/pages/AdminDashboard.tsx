import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, FileText, Users, Award } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [exams, setExams] = useState([
    { id: 1, candidateName: "박준호", skillName: "근골격 마사지", status: "진행중", submittedDate: "2026-03-17" },
    { id: 2, candidateName: "이수진", skillName: "관절 활성화", status: "진행중", submittedDate: "2026-03-16" },
  ]);

  const [certifications, setCertifications] = useState([
    { id: 1, candidateName: "김민지", skillName: "스포츠 회복", status: "대기중", requestDate: "2026-03-15" },
  ]);

  const [certificates, setCertificates] = useState<any[]>([]);
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [scoreForm, setScoreForm] = useState({ score: "", result: "합격" });
  const [certificateForm, setCertificateForm] = useState({ certNumber: "", issueDate: new Date().toISOString().split('T')[0] });

  // 시험 채점 처리
  const handleGradeExam = (examId: number) => {
    const exam = exams.find(e => e.id === examId);
    if (exam) {
      setSelectedExam(exam);
    }
  };

  const handleSubmitScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedExam) {
      setExams(exams.map(e => 
        e.id === selectedExam.id 
          ? { ...e, status: scoreForm.result }
          : e
      ));
      setSelectedExam(null);
      setScoreForm({ score: "", result: "합격" });
      alert("채점이 완료되었습니다.");
    }
  };

  // 수료증 발급
  const handleIssueCertificate = (certId: number) => {
    const cert = certifications.find(c => c.id === certId);
    if (cert) {
      const newCert = {
        id: certificates.length + 1,
        candidateName: cert.candidateName,
        skillName: cert.skillName,
        certNumber: certificateForm.certNumber,
        issueDate: certificateForm.issueDate,
        status: "발급완료"
      };
      setCertificates([...certificates, newCert]);
      setCertifications(certifications.filter(c => c.id !== certId));
      setCertificateForm({ certNumber: "", issueDate: new Date().toISOString().split('T')[0] });
      alert("수료증이 발급되었습니다.");
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">접근 권한 없음</h2>
          <p className="text-foreground/60">관리자만 접근할 수 있습니다.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-20">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
              SR
            </div>
            <h1 className="text-lg font-bold text-primary">관리자 대시보드</h1>
          </a>
        </div>
      </header>

      <div className="container py-12">
        {/* 통계 카드 */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60 mb-2">진행 중인 시험</p>
                <p className="text-3xl font-bold text-primary">{exams.length}</p>
              </div>
              <Users className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60 mb-2">대기 중인 자격검증</p>
                <p className="text-3xl font-bold text-primary">{certifications.length}</p>
              </div>
              <Award className="w-12 h-12 text-yellow-500 opacity-20" />
            </div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60 mb-2">발급된 수료증</p>
                <p className="text-3xl font-bold text-primary">{certificates.length}</p>
              </div>
              <FileText className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </Card>
        </div>

        <Tabs defaultValue="exams" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="exams">시험 채점</TabsTrigger>
            <TabsTrigger value="certifications">자격검증</TabsTrigger>
            <TabsTrigger value="certificates">발급된 수료증</TabsTrigger>
          </TabsList>

          {/* 시험 채점 탭 */}
          <TabsContent value="exams" className="space-y-6">
            <div className="space-y-4">
              {exams.map(exam => (
                <Card key={exam.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-primary mb-2">{exam.candidateName}</h3>
                      <p className="text-sm text-foreground/60">{exam.skillName}</p>
                      <p className="text-xs text-foreground/50 mt-1">제출일: {exam.submittedDate}</p>
                    </div>
                    <span className={`px-3 py-1 rounded text-sm font-bold ${
                      exam.status === '진행중' ? 'bg-yellow-100 text-yellow-800' :
                      exam.status === '합격' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {exam.status}
                    </span>
                  </div>
                  {exam.status === '진행중' && (
                    <Button 
                      onClick={() => handleGradeExam(exam.id)}
                      className="w-full bg-secondary hover:bg-secondary/90"
                    >
                      채점하기
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 자격검증 탭 */}
          <TabsContent value="certifications" className="space-y-6">
            <div className="space-y-4">
              {certifications.map(cert => (
                <Card key={cert.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-primary mb-2">{cert.candidateName}</h3>
                      <p className="text-sm text-foreground/60">{cert.skillName}</p>
                      <p className="text-xs text-foreground/50 mt-1">신청일: {cert.requestDate}</p>
                    </div>
                    <span className="px-3 py-1 rounded text-sm font-bold bg-blue-100 text-blue-800">
                      {cert.status}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">수료증 번호</label>
                      <input 
                        type="text"
                        placeholder="예: SRMA-2026-001"
                        value={certificateForm.certNumber}
                        onChange={(e) => setCertificateForm({...certificateForm, certNumber: e.target.value})}
                        className="w-full px-4 py-2 border border-border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">발급일</label>
                      <input 
                        type="date"
                        value={certificateForm.issueDate}
                        onChange={(e) => setCertificateForm({...certificateForm, issueDate: e.target.value})}
                        className="w-full px-4 py-2 border border-border rounded-lg"
                      />
                    </div>
                    <Button 
                      onClick={() => handleIssueCertificate(cert.id)}
                      className="w-full bg-secondary hover:bg-secondary/90"
                    >
                      수료증 발급
                    </Button>
                  </div>
                </Card>
              ))}
              {certifications.length === 0 && (
                <Card className="p-12 text-center">
                  <p className="text-foreground/60">대기 중인 자격검증이 없습니다.</p>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* 발급된 수료증 탭 */}
          <TabsContent value="certificates" className="space-y-6">
            <div className="space-y-4">
              {certificates.map(cert => (
                <Card key={cert.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-primary mb-2">{cert.candidateName}</h3>
                      <p className="text-sm text-foreground/60">{cert.skillName}</p>
                      <p className="text-xs text-foreground/50 mt-2">수료증 번호: {cert.certNumber}</p>
                      <p className="text-xs text-foreground/50">발급일: {cert.issueDate}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </Card>
              ))}
              {certificates.length === 0 && (
                <Card className="p-12 text-center">
                  <p className="text-foreground/60">발급된 수료증이 없습니다.</p>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 채점 모달 */}
      {selectedExam && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-primary mb-6">시험 채점</h3>
              <form onSubmit={handleSubmitScore} className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">응시자: {selectedExam.candidateName}</p>
                  <p className="text-sm text-foreground/60">{selectedExam.skillName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">점수 (0-100)</label>
                  <input 
                    type="number"
                    min="0"
                    max="100"
                    value={scoreForm.score}
                    onChange={(e) => setScoreForm({...scoreForm, score: e.target.value})}
                    className="w-full px-4 py-2 border border-border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">판정</label>
                  <select 
                    value={scoreForm.result}
                    onChange={(e) => setScoreForm({...scoreForm, result: e.target.value})}
                    className="w-full px-4 py-2 border border-border rounded-lg"
                  >
                    <option value="합격">합격</option>
                    <option value="불합격">불합격</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <Button type="submit" className="flex-1 bg-secondary hover:bg-secondary/90">
                    저장
                  </Button>
                  <Button 
                    type="button"
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setSelectedExam(null)}
                  >
                    취소
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
