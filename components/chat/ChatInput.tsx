'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function ChatInput({ onSend, isLoading, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (!input.trim() || isLoading || disabled) return;
    onSend(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  return (
    <div className="p-4 border-t border-pink-200/50 bg-background/80 backdrop-blur-md">
      <div className='flex gap-3 p-2 rounded-2xl bg-white/50 border-2 transition-all duration-300'>
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="메시지를 입력하세요..."
          disabled={isLoading || disabled}
          className="min-h-[44px] max-h-[150px] resize-none border-0 bg-transparent focus:ring-0 focus-visible:ring-0 focus:outline-none shadow-none focus:shadow-none focus-visible:shadow-none !ring-0 !outline-none"
          rows={1}
        />
        <Button
          onClick={handleSubmit}
          disabled={!input.trim() || isLoading || disabled}
          size="icon"
          className={`
            shrink-0 h-[44px] w-[44px] rounded-xl transition-all duration-300
            ${input.trim()
              ? 'bg-gradient-to-r from-pink-300 to-pink-400 hover:from-pink-400 hover:to-pink-500 shadow-lg hover:shadow-pink-300/50 hover:scale-105'
              : 'bg-pink-200 text-pink-400'
            }
          `}
        >
          {isLoading ? (
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-white rounded-full typing-dot" />
              <span className="w-1.5 h-1.5 bg-white rounded-full typing-dot" />
              <span className="w-1.5 h-1.5 bg-white rounded-full typing-dot" />
            </div>
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Helper text */}
      <div className="flex items-center justify-center gap-2 mt-2 text-xs text-pink-300">
        <Sparkles className="h-3 w-3" />
        <span>Enter로 전송, Shift+Enter로 줄바꿈</span>
      </div>
    </div>
  );
}
