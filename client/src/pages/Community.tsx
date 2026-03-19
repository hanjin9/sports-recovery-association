import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Heart, MessageSquare, Plus } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const CATEGORIES = ["경험공유", "질문답변", "자유게시판", "성공사례"];

export default function Community() {
  const { isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("경험공유");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "" });

  // 샘플 커뮤니티 포스트 데이터
  const samplePosts = [
    { id: 1, title: "스포츠 마사지 후 회복 경험 공유", category: "경험공유", author: "박준호", date: "2026-03-17", likes: 45, comments: 8 },
    { id: 2, title: "실기시험 준비 팁 있을까요?", category: "질문답변", author: "이수진", date: "2026-03-16", likes: 23, comments: 12 },
    { id: 3, title: "협회 활동 소감", category: "자유게시판", author: "김민지", date: "2026-03-15", likes: 67, comments: 15 },
    { id: 4, title: "마사지 자격증 취득 후 변화", category: "성공사례", author: "최준영", date: "2026-03-14", likes: 156, comments: 32 },
  ];

  const filteredPosts = selectedCategory 
    ? samplePosts.filter(post => post.category === selectedCategory)
    : samplePosts;

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    alert("게시물이 작성되었습니다.");
    setFormData({ title: "", content: "" });
    setShowCreateForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-20">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
              SR
            </div>
            <h1 className="text-lg font-bold text-primary">SRMA 커미니티</h1>
          </a>
          <Button 
            onClick={() => isAuthenticated ? setShowCreateForm(true) : window.location.href = '/login'}
            className="bg-secondary hover:bg-secondary/90"
          >
            <Plus className="w-4 h-4 mr-2" /> 글쓰기
          </Button>
        </div>
      </header>

      <div className="container py-12">
        {/* Category Filter */}
        <div className="mb-8 flex gap-3 flex-wrap">
          {CATEGORIES.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-primary" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredPosts.map(post => (
            <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                  {post.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-primary mb-3">{post.title}</h3>
              <div className="flex items-center gap-4 text-sm text-foreground/60 mb-4">
                <span>{post.author}</span>
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-foreground/60 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-foreground/60">게시물이 없습니다.</p>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl bg-white">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-primary mb-6">새 게시물 작성</h3>
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">카테고리</label>
                  <select className="w-full px-4 py-2 border border-border rounded-lg">
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">제목</label>
                  <Input 
                    placeholder="게시물 제목을 입력하세요"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">내용</label>
                  <textarea 
                    placeholder="게시물 내용을 입력하세요"
                    rows={6}
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <div className="flex gap-3">
                  <Button type="submit" className="flex-1 bg-secondary hover:bg-secondary/90">
                    게시
                  </Button>
                  <Button 
                    type="button"
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowCreateForm(false)}
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
