import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, FileText, CheckCircle, Download, User } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export default function UserProfile() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">로그인 필요</h2>
          <p className="text-foreground/60 mb-6">마이페이지를 보려면 로그인해야 합니다.</p>
          <Button 
            onClick={() => window.location.href = getLoginUrl()}
            className="bg-secondary hover:bg-secondary/90"
          >
            로그인하기
          </Button>
        </Card>
      </div>
    );
  }

  // 샘플 데이터
  const userExams = [
    { id: 1, skillName: "근골격 마사지", examDate: "2026-03-10", score: 85, status: "합격" },
    { id: 2, skillName: "관절 활성화", examDate: "2026-03-15", score: 92, status: "합격" },
  ];

  const userCertifications = [
    { id: 1, skillName: "근골격 마사지", certDate: "2026-03-12", certNumber: "SRMA-2026-001", status: "인증완료" },
  ];

  const userCertificates = [
    { id: 1, skillName: "근골격 마사지", issueDate: "2026-03-12", certNumber: "SRMA-2026-001" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
              <User className="w-6 h-6" />
            </div>
            <h1 className="text-lg font-bold text-primary">마이페이지</h1>
          </div>
        </div>
      </header>

      <div className="container py-12">
        {/* 프로필 섹션 */}
        <Card className="p-8 mb-12 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">{user?.name}</h2>
              <p className="text-foreground/60">{user?.email}</p>
              <p className="text-sm text-foreground/50 mt-2">가입일: {new Date(user?.createdAt || "").toLocaleDateString()}</p>
            </div>
          </div>
        </Card>

        {/* 통계 카드 */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center">
            <CheckCircle className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <p className="text-sm text-foreground/60 mb-2">응시한 시험</p>
            <p className="text-3xl font-bold text-primary">{userExams.length}</p>
          </Card>
          <Card className="p-6 text-center">
            <Award className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <p className="text-sm text-foreground/60 mb-2">자격검증</p>
            <p className="text-3xl font-bold text-primary">{userCertifications.length}</p>
          </Card>
          <Card className="p-6 text-center">
            <FileText className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <p className="text-sm text-foreground/60 mb-2">수료증</p>
            <p className="text-3xl font-bold text-primary">{userCertificates.length}</p>
          </Card>
        </div>

        {/* 탭 섹션 */}
        <Tabs defaultValue="exams" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="exams">시험 이력</TabsTrigger>
            <TabsTrigger value="certifications">자격검증</TabsTrigger>
            <TabsTrigger value="certificates">수료증</TabsTrigger>
          </TabsList>

          {/* 시험 이력 탭 */}
          <TabsContent value="exams" className="space-y-4">
            {userExams.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-foreground/60">응시한 시험이 없습니다.</p>
              </Card>
            ) : (
              userExams.map(exam => (
                <Card key={exam.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-primary mb-2">{exam.skillName}</h3>
                      <p className="text-sm text-foreground/60">응시일: {exam.examDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary mb-2">{exam.score}점</p>
                      <span className="px-3 py-1 rounded text-sm font-bold bg-green-100 text-green-800">
                        {exam.status}
                      </span>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          {/* 자격검증 탭 */}
          <TabsContent value="certifications" className="space-y-4">
            {userCertifications.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-foreground/60">자격검증 내역이 없습니다.</p>
              </Card>
            ) : (
              userCertifications.map(cert => (
                <Card key={cert.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-primary mb-2">{cert.skillName}</h3>
                      <p className="text-sm text-foreground/60">인증일: {cert.certDate}</p>
                      <p className="text-xs text-foreground/50 mt-2">인증번호: {cert.certNumber}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          {/* 수료증 탭 */}
          <TabsContent value="certificates" className="space-y-4">
            {userCertificates.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-foreground/60">발급된 수료증이 없습니다.</p>
              </Card>
            ) : (
              userCertificates.map(cert => (
                <Card key={cert.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-primary mb-2">{cert.skillName}</h3>
                      <p className="text-sm text-foreground/60">발급일: {cert.issueDate}</p>
                      <p className="text-xs text-foreground/50 mt-2">수료증 번호: {cert.certNumber}</p>
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      다운로드
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
