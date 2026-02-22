'use client';

import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

// 동적 import로 번들 사이즈 최적화
const SyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter').then((mod) => mod.Prism),
  { ssr: false, loading: () => <div className="animate-pulse bg-gray-200 rounded h-20" /> }
);

// CodeBlock 컴포넌트 - 동적 스타일 로드
function CodeBlock({ language, children }: { language: string; children: string }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={require('react-syntax-highlighter/dist/esm/styles/prism/one-dark').default}
      PreTag="div"
      customStyle={{ margin: 0 }}
      codeTagProps={{ className: 'text-sm' }}
      showLineNumbers={false}
    >
      {children}
    </SyntaxHighlighter>
  );
}

function getLanguageFromClassName(className?: string): string {
  if (!className) return 'text';
  const match = className.match(/language-(\w+)/);
  return match ? match[1] : 'text';
}

const roleConfig = {
  user: {
    container: 'flex-row-reverse animate-slide-in-right',
    avatarRing: 'ring-pink-200',
    bubble: 'bg-pink-400 text-white rounded-tr-sm',
    prose: 'prose-invert',
    showHeart: false,
  },
  assistant: {
    container: 'flex-row animate-slide-in-left',
    avatarRing: 'ring-pink-300',
    bubble: 'bg-white/80 backdrop-blur-sm border border-pink-100 rounded-tl-sm',
    prose: 'prose-pink',
    showHeart: true,
  },
} as const;

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
  const config = roleConfig[role];

  return (
    <div className={cn('flex gap-3 p-4 message-enter', config.container)}>
      <div className="relative">
        <Avatar className={cn(
          'h-10 w-10 shrink-0 ring-2 transition-[transform,opacity] duration-300',
          config.avatarRing
        )}>
          {role === 'user' ? (
            <AvatarFallback className="bg-pink-200">
              <User className="h-5 w-5 text-pink-600" />
            </AvatarFallback>
          ) : (
            <>
              <AvatarImage src={avatarUrl || '/split_image_1.png'} alt={botName} />
              <AvatarFallback className={`text-white bg-${themeColor}`} />
            </>
          )}
        </Avatar>
        {config.showHeart && (
          <Heart className="absolute -bottom-1 -right-1 h-4 w-4 text-pink-400 fill-pink-400 animate-pulse" />
        )}
      </div>

      <div
        className={cn(
          'max-w-[75%] rounded-2xl px-4 py-3 shadow-sm transition-shadow duration-300 hover:shadow-md',
          config.bubble
        )}
      >
        <div className={cn('prose prose-sm max-w-none', config.prose)}>
          <ReactMarkdown
            components={{
              pre: ({ children }) => (
                <div className="my-2 rounded-xl overflow-hidden [&>div]:rounded-xl">
                  {children}
                </div>
              ),
              code: ({ children, className }) => {
                const isInline = !className;
                if (isInline) {
                  return (
                    <code className="bg-pink-100 text-pink-700 px-1.5 py-0.5 rounded-md text-sm font-medium">
                      {children}
                    </code>
                  );
                }
                const language = getLanguageFromClassName(className);
                const codeString = String(children).replace(/\n$/, '');
                return (
                  <CodeBlock language={language}>{codeString}</CodeBlock>
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
