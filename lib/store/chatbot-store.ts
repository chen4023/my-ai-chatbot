import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Chatbot, Message } from '@/lib/types/chatbot';

interface ChatbotState {
  chatbots: Chatbot[];
  sessions: Record<string, Message[]>;

  // Chatbot CRUD
  addChatbot: (chatbot: Omit<Chatbot, 'id' | 'createdAt'>) => string;
  updateChatbot: (id: string, updates: Partial<Chatbot>) => void;
  deleteChatbot: (id: string) => void;
  getChatbot: (id: string) => Chatbot | undefined;

  // Chat Sessions
  addMessage: (chatbotId: string, message: Omit<Message, 'id' | 'createdAt'>) => void;
  getMessages: (chatbotId: string) => Message[];
  clearMessages: (chatbotId: string) => void;
}

export const useChatbotStore = create<ChatbotState>()(
  persist(
    (set, get) => ({
      chatbots: [],
      sessions: {},

      addChatbot: (chatbot) => {
        const id = crypto.randomUUID();
        const newChatbot: Chatbot = {
          ...chatbot,
          id,
          createdAt: Date.now(),
        };
        set((state) => ({
          chatbots: [...state.chatbots, newChatbot],
        }));
        return id;
      },

      updateChatbot: (id, updates) => {
        set((state) => ({
          chatbots: state.chatbots.map((bot) =>
            bot.id === id ? { ...bot, ...updates } : bot
          ),
        }));
      },

      deleteChatbot: (id) => {
        set((state) => {
          const { [id]: _, ...remainingSessions } = state.sessions;
          return {
            chatbots: state.chatbots.filter((bot) => bot.id !== id),
            sessions: remainingSessions,
          };
        });
      },

      getChatbot: (id) => {
        return get().chatbots.find((bot) => bot.id === id);
      },

      addMessage: (chatbotId, message) => {
        const newMessage: Message = {
          ...message,
          id: crypto.randomUUID(),
          createdAt: Date.now(),
        };
        set((state) => ({
          sessions: {
            ...state.sessions,
            [chatbotId]: [...(state.sessions[chatbotId] || []), newMessage],
          },
        }));
      },

      getMessages: (chatbotId) => {
        return get().sessions[chatbotId] || [];
      },

      clearMessages: (chatbotId) => {
        set((state) => ({
          sessions: {
            ...state.sessions,
            [chatbotId]: [],
          },
        }));
      },
    }),
    {
      name: 'chatbot-storage',
    }
  )
);
