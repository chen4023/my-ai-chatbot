'use client';

import { useChat, Chat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useMemo } from 'react';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { useApiKeyStore } from '@/lib/store/api-key-store';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import type { Chatbot } from '@/lib/types/chatbot';

interface ChatContainerProps {
  chatbot: Chatbot;
}

export function ChatContainer({ chatbot }: ChatContainerProps) {
  const { getApiKey, hasApiKey } = useApiKeyStore();
  const apiKey = getApiKey(chatbot.provider);

  const chat = useMemo(() => {
    return new Chat({
      transport: new DefaultChatTransport({
        api: '/api/chat',
        body: {
          model: chatbot.model,
          provider: chatbot.provider,
          systemPrompt: chatbot.systemPrompt,
          apiKey,
        },
      }),
    });
  }, [chatbot.model, chatbot.provider, chatbot.systemPrompt, apiKey]);

  const { messages, sendMessage, status, setMessages } = useChat({ chat });

  const isLoading = status === 'streaming' || status === 'submitted';

  const handleSend = (content: string) => {
    sendMessage({
      role: 'user',
      parts: [{ type: 'text', text: content }]
    });
  };

  const handleClear = () => {
    setMessages([]);
  };

  if (!hasApiKey(chatbot.provider)) {
    return (
      <div className="flex flex-col h-full">
        <ChatHeader chatbot={chatbot} onClear={handleClear} />
        <div className="flex-1 flex items-center justify-center p-4">
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {chatbot.provider.toUpperCase()} API Key가 설정되지 않았습니다.
              메인 화면에서 API Key를 설정해주세요.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ChatHeader chatbot={chatbot} onClear={handleClear} />
      <MessageList
        messages={messages}
        themeColor={chatbot.themeColor}
        avatarUrl={chatbot.avatar}
        botName={chatbot.name}
      />
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}
