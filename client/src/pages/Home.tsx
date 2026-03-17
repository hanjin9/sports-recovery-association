import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone, Dumbbell, Zap, Heart, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
              SR
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-bold text-primary">SRMA</h1>
              <p className="text-xs text-muted-foreground">스포츠 회복 관리사 협회</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium text-foreground hover:text-primary transition">협회소개</a>
            <a href="#services" className="text-sm font-medium text-foreground hover:text-primary transition">술기안내</a>
            <a href="#contact" className="text-sm font-medium text-foreground hover:text-primary transition">연락처</a>
          </nav>
          <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">예약하기</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-secondary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
              신체 통증에서 해방되세요
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 leading-relaxed">
              전문적인 마사지 술기와 근골격 활성화 기술로 스포츠 손상 회복과 일상의 통증을 완벽하게 관리합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                상담 신청하기
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                자세히 알아보기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">주요 술기 및 기술</h2>
            <p className="text-lg text-foreground/70">협회의 전문 기술로 당신의 건강을 회복합니다</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: "근골격 마사지", desc: "근육 긴장 완화 및 혈액순환 개선" },
              { icon: Zap, title: "관절 활성화", desc: "관절 유연성 증진 및 기능 회복" },
              { icon: Dumbbell, title: "스포츠 회복", desc: "운동 후 근육 회복 및 재활 치료" },
              { icon: Users, title: "맞춤형 관리", desc: "개인별 통증 분석 및 처방" },
            ].map((service, i) => (
              <Card key={i} className="p-6 hover:shadow-lg transition-shadow border-border/50 bg-white">
                <service.icon className="w-12 h-12 text-secondary mb-4" />
                <h3 className="text-xl font-bold text-primary mb-2">{service.title}</h3>
                <p className="text-sm text-foreground/70">{service.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-28 bg-primary/5">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">협회 소개</h2>
              <p className="text-lg text-foreground/80 mb-4 leading-relaxed">
                스포츠 회복 관리사 협회는 일상생활과 스포츠 활동으로 인한 신체 통증을 전문적인 마사지 술기와 근골격 활성화 기술로 관리하는 전문 기관입니다.
              </p>
              <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                회장 김유찬을 중심으로 최고의 전문가들이 모여, 고객의 건강 회복과 삶의 질 향상을 위해 최선을 다하고 있습니다.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="text-foreground">전문적인 마사지 술기 및 기술</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="text-foreground">맞춤형 건강 관리 프로그램</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="text-foreground">최신 회복 기술 및 장비</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 h-96 flex items-center justify-center border border-border/50">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary/30 mb-4">SRMA</div>
                <p className="text-foreground/60">스포츠 회복 관리사 협회</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chairman Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">협회 회장</h3>
              <p className="text-xl font-semibold mb-2">김 유 찬</p>
              <p className="text-white/90 mb-6">
                스포츠 회복 관리사 협회의 회장으로서 전문적인 마사지 술기와 근골격 활성화 기술을 통해 고객의 건강 회복을 위해 헌신하고 있습니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <Phone className="w-5 h-5" /> 010-5318-3332
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="w-5 h-5" /> kyc116116@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-28 bg-primary/5">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">연락처</h2>
            <p className="text-lg text-foreground/70">언제든지 편하게 연락주세요</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
            <Card className="p-8 text-center border-border/50 bg-white hover:shadow-lg transition-shadow">
              <Phone className="w-10 h-10 text-secondary mx-auto mb-4" />
              <h3 className="font-bold text-primary mb-2">전화</h3>
              <p className="text-foreground/70">010-5318-3332</p>
            </Card>
            <Card className="p-8 text-center border-border/50 bg-white hover:shadow-lg transition-shadow">
              <Mail className="w-10 h-10 text-secondary mx-auto mb-4" />
              <h3 className="font-bold text-primary mb-2">이메일</h3>
              <p className="text-foreground/70">kyc116116@gmail.com</p>
            </Card>
            <Card className="p-8 text-center border-border/50 bg-white hover:shadow-lg transition-shadow">
              <MapPin className="w-10 h-10 text-secondary mx-auto mb-4" />
              <h3 className="font-bold text-primary mb-2">위치</h3>
              <p className="text-foreground/70">서울시 강남구</p>
            </Card>
          </div>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 border border-border/50">
            <h3 className="text-2xl font-bold text-primary mb-6">빠른 상담 신청</h3>
            <form className="space-y-4">
              <input type="text" placeholder="이름" className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" />
              <input type="email" placeholder="이메일" className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" />
              <input type="tel" placeholder="전화번호" className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" />
              <textarea placeholder="문의사항" rows={4} className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"></textarea>
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">상담 신청</Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">스포츠 회복 관리사 협회</h4>
              <p className="text-white/80 text-sm">신체 통증 관리와 스포츠 회복의 전문가</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">빠른 링크</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#about" className="hover:text-white transition">협회소개</a></li>
                <li><a href="#services" className="hover:text-white transition">술기안내</a></li>
                <li><a href="#contact" className="hover:text-white transition">연락처</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">연락처</h4>
              <p className="text-sm text-white/80">전화: 010-5318-3332</p>
              <p className="text-sm text-white/80">이메일: kyc116116@gmail.com</p>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-sm text-white/70">
            <p>&copy; 2026 스포츠 회복 관리사 협회. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
