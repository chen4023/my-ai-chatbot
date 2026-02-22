'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Bot, Trash2, MessageCircle, Sparkles } from 'lucide-react';
import type { Chatbot } from '@/lib/types/chatbot';
import { useChatbotStore } from '@/lib/store/chatbot-store';

interface ChatbotCardProps {
  chatbot: Chatbot;
}

export function ChatbotCard({ chatbot }: ChatbotCardProps) {
  const deleteChatbot = useChatbotStore((state) => state.deleteChatbot);

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm(`"${chatbot.name}"을(를) 삭제하시겠습니까?`)) {
      deleteChatbot(chatbot.id);
    }
  };

  return (
    <Link href={`/chat/${chatbot.id}`}>
      <Card className="group glass-card interactive-card cursor-pointer h-full border-pink-200/50 hover:border-pink-300 overflow-hidden relative">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-linear-to-br from-pink-100/0 to-pink-200/0 group-hover:from-pink-100/30 group-hover:to-pink-200/20 transition-all duration-500" />

        <CardContent className="p-5 relative z-10">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="h-14 w-14 ring-2 ring-pink-200/50 group-hover:ring-pink-300 transition-all duration-300 group-hover:scale-105">
                <AvatarImage src={chatbot.avatar || '/split_image_1.png'} alt={chatbot.name} />
                <AvatarFallback
                  className="text-white"
                  style={{ backgroundColor: chatbot.themeColor }}
                >
                  <Bot className="h-7 w-7" />
                </AvatarFallback>
              </Avatar>
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center shadow-md"
                style={{ backgroundColor: chatbot.themeColor }}
              >
                <MessageCircle className="h-3 w-3 text-white" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg truncate group-hover:text-pink-500 transition-colors">
                  {chatbot.name}
                </h3>
                <Sparkles className="h-4 w-4 text-pink-300 opacity-0 group-hover:opacity-100 transition-opacity animate-sparkle" />
              </div>
              <p className="text-sm text-pink-400/80 font-medium">
                {chatbot.model}
              </p>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                {chatbot.systemPrompt}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 shrink-0 hover:bg-pink-100 hover:text-pink-500 -translate-y-2 group-hover:translate-y-0"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Animated progress bar */}
          <div className="mt-4 h-1.5 rounded-full bg-pink-100 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 group-hover:w-full"
              style={{
                backgroundColor: chatbot.themeColor,
                width: '30%'
              }}
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
