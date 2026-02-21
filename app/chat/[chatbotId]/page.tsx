'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useChatbotStore } from '@/lib/store/chatbot-store';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { Bot, Sparkles } from 'lucide-react';
import type { Chatbot } from '@/lib/types/chatbot';

interface ChatPageProps {
  params: Promise<{ chatbotId: string }>;
}

export default function ChatPage({ params }: ChatPageProps) {
  const { chatbotId } = use(params);
  const router = useRouter();
  const getChatbot = useChatbotStore((state) => state.getChatbot);
  const [chatbot, setChatbot] = useState<Chatbot | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bot = getChatbot(chatbotId);
    if (bot) {
      setChatbot(bot);
    } else {
      router.push('/');
    }
    setIsLoading(false);
  }, [chatbotId, getChatbot, router]);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-background bg-pattern">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center animate-pulse-glow">
            <Bot className="h-10 w-10 text-pink-500" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-pink-400 animate-sparkle" />
        </div>
        <div className="flex items-center gap-2 text-pink-400">
          <span className="w-2 h-2 bg-pink-400 rounded-full typing-dot" />
          <span className="w-2 h-2 bg-pink-400 rounded-full typing-dot" />
          <span className="w-2 h-2 bg-pink-400 rounded-full typing-dot" />
        </div>
        <p className="mt-4 text-muted-foreground">챗봇을 불러오는 중...</p>
      </div>
    );
  }

  if (!chatbot) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col bg-background bg-pattern relative overflow-hidden">
      {/* Subtle floating orbs for chat page */}
      <div className="floating-orb floating-orb-2 top-20 right-10 opacity-20" />
      <div className="floating-orb floating-orb-3 bottom-40 left-10 opacity-20" />

      <ChatContainer chatbot={chatbot} />
    </div>
  );
}
