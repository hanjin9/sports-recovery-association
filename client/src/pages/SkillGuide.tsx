import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, Award, FileText, AlertCircle } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export default function SkillGuide() {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [showExamForm, setShowExamForm] = useState(false);
  const [exams, setExams] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);

  const skills = [
    {
      id: 1,
      name: "근골격 마사지",
      description: "근육 긴장 완화 및 혈액순환 개선",
      duration: "40시간",
      level: "기초"
    },
    {
      id: 2,
      name: "관절 활성화 기술",
      description: "관절 유연성 증진 및 기능 회복",
      duration: "50시간",
      level: "중급"
    },
    {
      id: 3,
      name: "스포츠 회복 마사지",
      description: "운동 후 근육 회복 및 재활 치료",
      duration: "60시간",
      level: "고급"
    },
    {
      id: 4,
      name: "맞춤형 통증 관리",
      description: "개인별 통증 분석 및 처방",
      duration: "45시간",
      level: "중급"
    }
  ];

  const handleStartExam = (skillId: number) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    setShowExamForm(true);
  };

  const handleSubmitExam = (e: React.FormEvent) => {
    e.preventDefault();
    const newExam = {
      id: exams.length + 1,
      skillName: "근골격 마사지",
      status: "진행중",
      startDate: new Date().toLocaleDateString(),
      score: null
    };
    setExams([...exams, newExam]);
    setShowExamForm(false);
    alert("실기시험이 시작되었습니다.");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
              SR
            </div>
            <h1 className="text-lg font-bold text-primary">술기 안내 및 시험</h1>
          </div>
        </div>
      </header>

      <div className="container py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">술기 안내</TabsTrigger>
            <TabsTrigger value="exam">실기시험</TabsTrigger>
            <TabsTrigger value="certification">자격검증</TabsTrigger>
            <TabsTrigger value="certificate">수료증</TabsTrigger>
          </TabsList>

          {/* 술기 안내 탭 */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map(skill => (
                <Card key={skill.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-primary">{skill.name}</h3>
                    <span className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-foreground/70 mb-4">{skill.description}</p>
                  <div className="flex items-center gap-2 text-sm text-foreground/60 mb-6">
                    <Clock className="w-4 h-4" />
                    <span>{skill.duration}</span>
                  </div>
                  <Button 
                    onClick={() => handleStartExam(skill.id)}
                    className="w-full bg-secondary hover:bg-secondary/90"
                  >
                    실기시험 응시
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 실기시험 탭 */}
          <TabsContent value="exam" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">실기시험 관리</h2>
              <Button 
                onClick={() => isAuthenticated ? setShowExamForm(true) : window.location.href = getLoginUrl()}
                className="bg-secondary hover:bg-secondary/90"
              >
                새 시험 신청
              </Button>
            </div>

            {exams.length === 0 ? (
              <Card className="p-12 text-center">
                <AlertCircle className="w-12 h-12 text-foreground/40 mx-auto mb-4" />
                <p className="text-foreground/60">응시한 실기시험이 없습니다.</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {exams.map(exam => (
                  <Card key={exam.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-primary mb-2">{exam.skillName}</h3>
                        <p className="text-sm text-foreground/60">신청일: {exam.startDate}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-bold px-3 py-1 rounded ${
                          exam.status === '진행중' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : exam.status === '합격'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {exam.status}
                        </span>
                        {exam.score && <p className="text-lg font-bold mt-2">{exam.score}점</p>}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* 자격검증 탭 */}
          <TabsContent value="certification" className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-6">자격검증</h2>
            
            <Card className="p-6 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-blue-900 mb-2">자격검증 절차</h3>
                  <ol className="text-sm text-blue-800 space-y-2">
                    <li>1. 실기시험 합격</li>
                    <li>2. 자격검증 신청</li>
                    <li>3. 협회 심사 (3-5일)</li>
                    <li>4. 자격 인증 완료</li>
                  </ol>
                </div>
              </div>
            </Card>

            <Button className="w-full bg-secondary hover:bg-secondary/90">
              자격검증 신청하기
            </Button>
          </TabsContent>

          {/* 수료증 탭 */}
          <TabsContent value="certificate" className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-6">수료증</h2>

            {certificates.length === 0 ? (
              <Card className="p-12 text-center">
                <FileText className="w-12 h-12 text-foreground/40 mx-auto mb-4" />
                <p className="text-foreground/60 mb-6">발급된 수료증이 없습니다.</p>
                <p className="text-sm text-foreground/50">자격검증 완료 후 수료증이 발급됩니다.</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {certificates.map(cert => (
                  <Card key={cert.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Award className="w-8 h-8 text-secondary" />
                        <div>
                          <h3 className="font-bold text-primary">{cert.courseName}</h3>
                          <p className="text-sm text-foreground/60">수료증 번호: {cert.number}</p>
                        </div>
                      </div>
                      <Button variant="outline">다운로드</Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Exam Form Modal */}
      {showExamForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-primary mb-6">실기시험 신청</h3>
              <form onSubmit={handleSubmitExam} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">술기 선택</label>
                  <select className="w-full px-4 py-2 border border-border rounded-lg">
                    {skills.map(skill => (
                      <option key={skill.id} value={skill.id}>{skill.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">시험 날짜</label>
                  <input 
                    type="date"
                    className="w-full px-4 py-2 border border-border rounded-lg"
                  />
                </div>
                <div className="flex gap-3">
                  <Button type="submit" className="flex-1 bg-secondary hover:bg-secondary/90">
                    신청
                  </Button>
                  <Button 
                    type="button"
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowExamForm(false)}
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
