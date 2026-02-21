'use client';

import { useChatbotStore } from '@/lib/store/chatbot-store';
import { ChatbotCard } from './ChatbotCard';
import { MessageSquarePlus, Sparkles, Heart, Bot } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function ChatbotList() {
  const chatbots = useChatbotStore((state) => state.chatbots);

  if (chatbots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-slide-up">
        {/* Decorative icons */}
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-full bg-linear-to-br from-pink-100 to-pink-200 flex items-center justify-center animate-pulse-glow">
            <Bot className="h-16 w-16 text-pink-400" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-3 gradient-text">
          아직 챗봇이 없습니다
        </h2>
        <p className="text-muted-foreground mb-8 max-w-sm">
          AI 모델과 페르소나를 조합하여<br />
          나만의 특별한 AI 친구를 만들어보세요!
        </p>

        <Link href="/create">
          <Button className="bg-linear-to-r from-pink-300 to-pink-400 hover:from-pink-400 hover:to-pink-500 text-white shadow-lg btn-glow border-0 px-8 py-6 text-lg">
            <MessageSquarePlus className="h-5 w-5 mr-2" />
            첫 번째 챗봇 만들기
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
      {chatbots.map((chatbot) => (
        <ChatbotCard key={chatbot.id} chatbot={chatbot} />
      ))}
    </div>
  );
}
