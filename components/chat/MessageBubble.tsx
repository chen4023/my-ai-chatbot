'use client';

import ReactMarkdown from 'react-markdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Bot, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  themeColor?: string;
  avatarUrl?: string;
  botName?: string;
}

export function MessageBubble({
  role,
  content,
  themeColor = '#f9a8d4',
  avatarUrl,
  botName,
}: MessageBubbleProps) {
  const isUser = role === 'user';

  return (
    <div
      className={cn(
        'flex gap-3 p-4 message-enter',
        isUser ? 'flex-row-reverse animate-slide-in-right' : 'flex-row animate-slide-in-left'
      )}
    >
      <div className="relative">
        <Avatar className={cn(
          'h-10 w-10 shrink-0 ring-2 transition-all duration-300',
          isUser ? 'ring-pink-200' : 'ring-pink-300'
        )}>
          {isUser ? (
            <AvatarFallback className="bg-pink-200 from-pink-200 to-pink-300">
              <User className="h-5 w-5 text-pink-600" />
            </AvatarFallback>
          ) : (
            <>
              <AvatarImage src={avatarUrl || '/split_image_1.png'} alt={botName} />
              <AvatarFallback
                className="text-white"
                style={{ backgroundColor: themeColor }}
              >
                <Bot className="h-5 w-5" />
              </AvatarFallback>
            </>
          )}
        </Avatar>
        {!isUser && (
          <Heart className="absolute -bottom-1 -right-1 h-4 w-4 text-pink-400 fill-pink-400 animate-pulse" />
        )}
      </div>

      <div
        className={cn(
          'max-w-[75%] rounded-2xl px-4 py-3 shadow-sm transition-all duration-300 hover:shadow-md',
          isUser
            ? 'bg-pink-400 from-pink-300 to-pink-400 text-white rounded-tr-sm'
            : 'bg-white/80 backdrop-blur-sm border border-pink-100 rounded-tl-sm'
        )}
      >
        <div className={cn(
          'prose prose-sm max-w-none',
          isUser ? 'prose-invert' : 'prose-pink'
        )}>
          <ReactMarkdown
            components={{
              pre: ({ children }) => (
                <pre className="bg-gray-800 text-gray-100 rounded-xl p-3 overflow-x-auto my-2 shadow-inner">
                  {children}
                </pre>
              ),
              code: ({ children, className }) => {
                const isInline = !className;
                return isInline ? (
                  <code className="bg-pink-100 text-pink-700 px-1.5 py-0.5 rounded-md text-sm font-medium">
                    {children}
                  </code>
                ) : (
                  <code>{children}</code>
                );
              },
              p: ({ children }) => (
                <p className="leading-relaxed">{children}</p>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
