import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Smartphone, Monitor, Eye, ExternalLink, Copy, Download } from 'lucide-react';

export default function MobilePreview() {
  const [currentPage, setCurrentPage] = useState('home');
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [iframeKey, setIframeKey] = useState(0);

  const pages = [
    { id: 'home', name: '홈페이지', path: '/home' },
    { id: 'board', name: '게시판', path: '/board' },
    { id: 'community', name: '커뮤니티', path: '/community' },
    { id: 'skill-guide', name: '술기 안내', path: '/skill-guide' },
    { id: 'login', name: '로그인', path: '/login' },
  ];

  const currentPageData = pages.find(p => p.id === currentPage);
  const iframeUrl = `http://localhost:3000${currentPageData?.path || '/'}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(iframeUrl);
    alert('링크가 복사되었습니다!');
  };

  const handleOpenNewWindow = () => {
    window.open(iframeUrl, '_blank');
  };

  const handleRefresh = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">스포츠 관리사 협회 - 반응형 미리보기</h1>
          <p className="text-gray-600">모바일 / 웹 화면 전환 및 검수 대시보드</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📋 페이지 선택</h2>
            
            <div className="space-y-2 mb-6">
              {pages.map(page => (
                <button
                  key={page.id}
                  onClick={() => setCurrentPage(page.id)}
                  className={`w-full px-4 py-3 rounded-lg font-medium transition-all ${
                    currentPage === page.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {page.name}
                </button>
              ))}
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-3">📱 뷰 모드</h3>
            <div className="space-y-2 mb-6">
              <button
                onClick={() => setViewMode('mobile')}
                className={`w-full px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                  viewMode === 'mobile'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Smartphone size={20} /> 모바일
              </button>
              <button
                onClick={() => setViewMode('desktop')}
                className={`w-full px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                  viewMode === 'desktop'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Monitor size={20} /> 웹
              </button>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-3">⚙️ 액션</h3>
            <div className="space-y-2">
              <button
                onClick={handleRefresh}
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2"
              >
                <Eye size={18} /> 새로고침
              </button>
              <button
                onClick={handleOpenNewWindow}
                className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink size={18} /> 새창 열기
              </button>
              <button
                onClick={handleCopyLink}
                className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
              >
                <Copy size={18} /> 링크 복사
              </button>
            </div>

            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <p className="text-xs text-gray-600 mb-2">현재 URL:</p>
              <p className="text-xs font-mono text-gray-800 break-all">{iframeUrl}</p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {viewMode === 'mobile' ? (
                    <Smartphone size={24} />
                  ) : (
                    <Monitor size={24} />
                  )}
                  <div>
                    <p className="font-bold">{currentPageData?.name}</p>
                    <p className="text-sm opacity-90">{viewMode === 'mobile' ? '모바일 (375px)' : '웹 (1024px)'}</p>
                  </div>
                </div>
                <button
                  onClick={handleRefresh}
                  className="px-3 py-1 bg-white text-blue-600 rounded hover:bg-blue-50 transition-all font-medium text-sm"
                >
                  🔄 새로고침
                </button>
              </div>

              <div className={`flex items-center justify-center p-4 ${viewMode === 'mobile' ? 'bg-gray-100' : 'bg-white'}`}>
                <div
                  className={`rounded-lg shadow-2xl overflow-hidden border-8 border-gray-800 ${
                    viewMode === 'mobile'
                      ? 'w-96 h-screen max-h-96'
                      : 'w-full h-96'
                  }`}
                  style={{
                    aspectRatio: viewMode === 'mobile' ? '9/16' : '16/9',
                  }}
                >
                    <iframe
                    key={iframeKey}
                    src={iframeUrl}
                    className="w-full h-full border-none"
                    title={currentPageData?.name}
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                  />
                </div>
              </div>

              <div className="bg-gray-50 border-t p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">현재 페이지</p>
                    <p className="font-bold text-gray-800">{currentPageData?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">뷰 모드</p>
                    <p className="font-bold text-gray-800">{viewMode === 'mobile' ? '모바일' : '웹'}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600">경로</p>
                    <p className="font-mono text-xs text-gray-800 break-all">{currentPageData?.path}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
