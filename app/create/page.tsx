'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CreateChatbotForm } from '@/components/chatbot/CreateChatbotForm';
import { ArrowLeft, Sparkles, Heart } from 'lucide-react';
import Image from 'next/image';

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-background bg-pattern relative overflow-hidden">
      {/* Floating Orbs */}
      <div className="floating-orb floating-orb-1 top-10 right-10" />
      <div className="floating-orb floating-orb-2 bottom-20 left-10" />
      <div className="floating-orb floating-orb-3 top-1/2 right-1/4" />

      {/* 헤더 */}
      <header className="border-b border-pink-200/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-pink-100 hover:text-pink-500 transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3 animate-slide-in-left">
            <div className="relative">
              <Image
                src="/icon.png"
                alt="logo"
                width={40}
                height={40}
                className="animate-float"
              />
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-pink-300 animate-sparkle" />
            </div>
            <h1 className="text-xl font-bold gradient-text">새 챗봇 만들기</h1>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-10 max-w-2xl relative z-10">
        {/* 헤더 섹션 */}
        <div className="text-center mb-10 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100/80 rounded-full text-pink-500 text-sm font-medium mb-4">
            <Heart className="h-4 w-4 fill-pink-400" />
            나만의 AI 친구 만들기
          </div>
          <h2 className="text-3xl font-bold mb-3">
            <span className="gradient-text">특별한 챗봇</span>을 만들어보세요
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            AI의 성격과 역할을 정의하여 나만의 맞춤형 AI 어시스턴트를 만들 수 있어요.
          </p>
        </div>

        {/* 폼 카드 */}
        <Card className="glass-card border-pink-200/50 shadow-xl shadow-pink-100/30 overflow-hidden">
          <CardContent className="p-8">
            <CreateChatbotForm />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
