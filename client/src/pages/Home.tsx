import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone, Dumbbell, Zap, Heart, Users, CreditCard } from "lucide-react";
import { useState } from "react";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("모든 필드를 입력해주세요");
      return;
    }
    toast.success("상담 신청이 완료되었습니다. 곧 연락드리겠습니다.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handlePaymentClick = () => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    setShowPaymentModal(true);
  };

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
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-foreground">{user?.name}</span>
                <Button size="sm" variant="outline" onClick={logout}>로그아웃</Button>
              </>
            ) : (
              <Button size="sm" onClick={() => window.location.href = getLoginUrl()}>로그인</Button>
            )}
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" onClick={() => setShowReservationForm(true)}>예약하기</Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Large Image */}
      <section className="relative py-0 md:py-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
        <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center">
          <img 
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663351563633/2BPpRBXCnBZ6CCnqv7Cgqp/hero-sports-recovery-cMAghcY5WrXbnYdp6KzoZt.webp" 
            alt="스포츠 회복 마사지 테라피"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
                신체 통증에서 해방되세요
              </h2>
              <p className="text-lg md:text-xl mb-8 leading-relaxed drop-shadow-md">
                전문적인 마사지 술기와 근골격 활성화 기술로 스포츠 손상 회복과 일상의 통증을 완벽하게 관리합니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" onClick={() => setShowReservationForm(true)}>
                  상담 신청하기
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  자세히 알아보기
                </Button>
              </div>
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
              { 
                icon: Heart, 
                title: "근골격 마사지", 
                desc: "근육 긴장 완화 및 혈액순환 개선",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663351563633/2BPpRBXCnBZ6CCnqv7Cgqp/service-massage-technique-adprBs8CryPqmiGmVGZsLS.webp"
              },
              { 
                icon: Zap, 
                title: "관절 활성화", 
                desc: "관절 유연성 증진 및 기능 회복",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663351563633/2BPpRBXCnBZ6CCnqv7Cgqp/service-joint-activation-cU5LmcTPErnav5KPbx7ZqH.webp"
              },
              { 
                icon: Dumbbell, 
                title: "스포츠 회복", 
                desc: "운동 후 근육 회복 및 재활 치료",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663351563633/2BPpRBXCnBZ6CCnqv7Cgqp/service-massage-technique-adprBs8CryPqmiGmVGZsLS.webp"
              },
              { 
                icon: Users, 
                title: "맞춤형 관리", 
                desc: "개인별 통증 분석 및 처방",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663351563633/2BPpRBXCnBZ6CCnqv7Cgqp/service-joint-activation-cU5LmcTPErnav5KPbx7ZqH.webp"
              },
            ].map((service, i) => (
              <Card key={i} className="p-6 hover:shadow-lg transition-shadow border-border/50 bg-white overflow-hidden">
                <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
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
            <div className="relative w-full h-96 rounded-2xl overflow-hidden border border-border/50">
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663351563633/2BPpRBXCnBZ6CCnqv7Cgqp/about-professional-team-gaujQ8xoQeyPcCz8k6qyrC.webp" 
                alt="스포츠 회복 관리사 협회 팀"
                className="w-full h-full object-cover"
              />
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
          
          {/* Contact Image Section */}
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-12 border border-border/50">
            <img 
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663351563633/2BPpRBXCnBZ6CCnqv7Cgqp/contact-consultation-AJDMsARHQzduNQf6DKU7nS.webp" 
              alt="전문 상담 세션"
              className="w-full h-full object-cover"
            />
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
            <form onSubmit={handleSubmitConsultation} className="space-y-4">
              <input 
                type="text" 
                name="name"
                placeholder="이름" 
                value={formData.name}
                onChange={handleFormChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" 
              />
              <input 
                type="email" 
                name="email"
                placeholder="이메일" 
                value={formData.email}
                onChange={handleFormChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" 
              />
              <input 
                type="tel" 
                name="phone"
                placeholder="전화번호" 
                value={formData.phone}
                onChange={handleFormChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" 
              />
              <textarea 
                name="message"
                placeholder="문의사항" 
                rows={4} 
                value={formData.message}
                onChange={handleFormChange}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              ></textarea>
              <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">상담 신청</Button>
            </form>
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 border-border/50 bg-white">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-secondary" />
                <h3 className="text-2xl font-bold text-primary">서비스 결제</h3>
              </div>
              <p className="text-foreground/70 mb-6">안전한 결제로 협회의 프리미엄 서비스를 이용하세요.</p>
              <Button 
                onClick={handlePaymentClick}
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                결제하기
              </Button>
            </Card>
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

      {/* Reservation Modal */}
      {showReservationForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-primary mb-4">예약 신청</h3>
              <form className="space-y-4">
                <input type="text" placeholder="이름" className="w-full px-4 py-2 border border-border rounded-lg" />
                <input type="email" placeholder="이메일" className="w-full px-4 py-2 border border-border rounded-lg" />
                <input type="tel" placeholder="전화번호" className="w-full px-4 py-2 border border-border rounded-lg" />
                <input type="date" className="w-full px-4 py-2 border border-border rounded-lg" />
                <div className="flex gap-3">
                  <Button className="flex-1 bg-secondary hover:bg-secondary/90">예약 확정</Button>
                  <Button variant="outline" className="flex-1" onClick={() => setShowReservationForm(false)}>취소</Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-primary mb-4">카드 결제</h3>
              <p className="text-foreground/70 mb-6">결제 정보를 입력하세요. (현재 테스트 모드)</p>
              <form className="space-y-4">
                <input type="text" placeholder="카드 번호" className="w-full px-4 py-2 border border-border rounded-lg" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="MM/YY" className="px-4 py-2 border border-border rounded-lg" />
                  <input type="text" placeholder="CVC" className="px-4 py-2 border border-border rounded-lg" />
                </div>
                <input type="number" placeholder="금액 (원)" className="w-full px-4 py-2 border border-border rounded-lg" />
                <div className="flex gap-3">
                  <Button className="flex-1 bg-secondary hover:bg-secondary/90" onClick={() => toast.success("결제 완료되었습니다!")}>결제하기</Button>
                  <Button variant="outline" className="flex-1" onClick={() => setShowPaymentModal(false)}>취소</Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
