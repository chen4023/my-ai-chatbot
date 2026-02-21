'use client';

import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageBubble } from './MessageBubble';
import type { UIMessage } from 'ai';

interface MessageListProps {
  messages: UIMessage[];
  themeColor?: string;
  avatarUrl?: string;
  botName?: string;
}

function getMessageContent(message: UIMessage): string {
  return message.parts
    .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
    .map((part) => part.text)
    .join('');
}

export function MessageList({
  messages,
  themeColor,
  avatarUrl,
  botName,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <p>대화를 시작해보세요!</p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="flex flex-col">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role as 'user' | 'assistant'}
            content={getMessageContent(message)}
            themeColor={themeColor}
            avatarUrl={avatarUrl}
            botName={botName}
          />
        ))}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
