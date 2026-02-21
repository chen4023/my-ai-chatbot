'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChatbotList } from '@/components/chatbot/ChatbotList';
import { ApiKeyDialog } from '@/components/settings/ApiKeyDialog';
import { Plus, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background bg-pattern relative overflow-hidden">
      {/* Floating Orbs */}
      <div className="floating-orb floating-orb-1 top-20 left-10" />
      <div className="floating-orb floating-orb-2 top-40 right-20" />
      <div className="floating-orb floating-orb-3 bottom-40 left-1/3" />

      {/* 헤더 */}
      <header className="border-b border-pink-200/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 animate-slide-in-left">
            <div className="relative">
              <Image
                src="/icon.png"
                alt="logo"
                width={60}
                height={60}
                className="animate-float"
              />
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-pink-300 animate-sparkle" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">
              AI Chatbot Studio
            </h1>
          </div>
          <div className="flex items-center gap-3 animate-slide-in-right">
            <ApiKeyDialog />
            <Link href="/create">
              <Button className="bg-pink-400 hover:bg-pink-500 text-white shadow-lg btn-glow border-0">
                <Plus className="h-4 w-4 mr-2" />
                새 챗봇 만들기
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="mb-10 text-center animate-slide-up">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-pink-400">Chatbot Studio</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            AI 모델과 페르소나를 조합하여 나만의 특별한 챗봇을 만들어보세요.
          </p>
        </div>
        <ChatbotList />
      </main>
    </div>
  );
}
