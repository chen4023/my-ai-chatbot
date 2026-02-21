import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ModelProvider } from '@/lib/types/chatbot';

interface ApiKeyState {
  apiKeys: Record<ModelProvider, string>;
  setApiKey: (provider: ModelProvider, key: string) => void;
  getApiKey: (provider: ModelProvider) => string;
  removeApiKey: (provider: ModelProvider) => void;
  hasApiKey: (provider: ModelProvider) => boolean;
}

export const useApiKeyStore = create<ApiKeyState>()(
  persist(
    (set, get) => ({
      apiKeys: {
        openai: '',
        anthropic: '',
        google: '',
      },

      setApiKey: (provider, key) => {
        set((state) => ({
          apiKeys: {
            ...state.apiKeys,
            [provider]: key,
          },
        }));
      },

      getApiKey: (provider) => {
        return get().apiKeys[provider] || '';
      },

      removeApiKey: (provider) => {
        set((state) => ({
          apiKeys: {
            ...state.apiKeys,
            [provider]: '',
          },
        }));
      },

      hasApiKey: (provider) => {
        return !!get().apiKeys[provider];
      },
    }),
    {
      name: 'api-key-storage',
    }
  )
);
