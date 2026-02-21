'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Bot, Sparkles } from 'lucide-react';
import Link from 'next/link';
import type { Chatbot } from '@/lib/types/chatbot';

interface ChatHeaderProps {
  chatbot: Chatbot;
  onClear: () => void;
}

export function ChatHeader({ chatbot, onClear }: ChatHeaderProps) {
  return (
    <header className="flex items-center gap-4 p-4 border-b border-pink-200/50 bg-background/80 backdrop-blur-md animate-slide-up">
      <Link href="/">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-pink-100 hover:text-pink-500 transition-all duration-300 hover:scale-105"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </Link>

      <div className="relative">
        <Avatar className="h-12 w-12 ring-2 ring-pink-200/50">
          <AvatarImage src={chatbot.avatar || '/split_image_1.png'} alt={chatbot.name} />
          <AvatarFallback
            className="text-white"
            style={{ backgroundColor: chatbot.themeColor }}
          >
            <Bot className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-lg truncate">{chatbot.name}</h1>
          <Sparkles className="h-4 w-4 text-pink-300 animate-sparkle" />
        </div>
        <p className="text-sm text-pink-400/80 font-medium">{chatbot.model}</p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={onClear}
        title="대화 초기화"
        className="hover:bg-pink-100 hover:text-pink-500 transition-all duration-300 hover:rotate-180"
      >
        <RotateCcw className="h-5 w-5" />
      </Button>
    </header>
  );
}
