'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApiKeyStore } from '@/lib/store/api-key-store';
import { Settings, Eye, EyeOff, Check, X, Key, Sparkles, Shield } from 'lucide-react';
import type { ModelProvider } from '@/lib/types/chatbot';

const PROVIDERS: { id: ModelProvider; name: string; placeholder: string; color: string }[] = [
  { id: 'openai', name: 'OpenAI', placeholder: 'sk-...', color: '#10B981' },
  { id: 'anthropic', name: 'Anthropic', placeholder: 'sk-ant-...', color: '#8B5CF6' },
  { id: 'google', name: 'Google AI', placeholder: 'AIza...', color: '#F59E0B' },
];

export function ApiKeyDialog() {
  const [open, setOpen] = useState(false);
  const [showKeys, setShowKeys] = useState<Record<ModelProvider, boolean>>({
    openai: false,
    anthropic: false,
    google: false,
  });

  const { apiKeys, setApiKey, hasApiKey } = useApiKeyStore();
  const [localKeys, setLocalKeys] = useState(apiKeys);

  const handleOpen = (isOpen: boolean) => {
    if (isOpen) {
      setLocalKeys(apiKeys);
    }
    setOpen(isOpen);
  };

  const handleSave = () => {
    Object.entries(localKeys).forEach(([provider, key]) => {
      setApiKey(provider as ModelProvider, key);
    });
    setOpen(false);
  };

  const toggleShowKey = (provider: ModelProvider) => {
    setShowKeys((prev) => ({ ...prev, [provider]: !prev[provider] }));
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-pink-200 hover:bg-pink-50 hover:border-pink-300 transition-all duration-300"
        >
          <Key className="h-4 w-4 mr-2 text-pink-400" />
          API 설정
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] border-pink-200 bg-gradient-to-br from-white to-pink-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-300 to-pink-400 flex items-center justify-center">
              <Key className="h-5 w-5 text-white" />
            </div>
            API Key 설정
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-pink-400">
            <Shield className="h-4 w-4" />
            키는 브라우저에만 안전하게 저장됩니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {PROVIDERS.map((provider, index) => (
            <div
              key={provider.id}
              className="space-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <Label
                  htmlFor={provider.id}
                  className="flex items-center gap-2 font-semibold"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: provider.color }}
                  />
                  {provider.name}
                </Label>
                {hasApiKey(provider.id) && (
                  <span className="flex items-center text-xs text-green-500 bg-green-50 px-2 py-1 rounded-full">
                    <Check className="h-3 w-3 mr-1" />
                    설정됨
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id={provider.id}
                    type={showKeys[provider.id] ? 'text' : 'password'}
                    value={localKeys[provider.id]}
                    onChange={(e) =>
                      setLocalKeys((prev) => ({
                        ...prev,
                        [provider.id]: e.target.value,
                      }))
                    }
                    placeholder={provider.placeholder}
                    className="bg-white/70 border-pink-200 focus:border-pink-400 rounded-xl pr-10"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleShowKey(provider.id)}
                  className="hover:bg-pink-100 hover:text-pink-500 rounded-xl transition-all duration-300"
                >
                  {showKeys[provider.id] ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                {localKeys[provider.id] && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setLocalKeys((prev) => ({ ...prev, [provider.id]: '' }))
                    }
                    className="hover:bg-pink-100 hover:text-pink-500 rounded-xl transition-all duration-300"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-pink-200 hover:bg-pink-50 hover:border-pink-300 rounded-xl transition-all duration-300"
          >
            취소
          </Button>
          <Button
            onClick={handleSave}
            className="bg-linear-to-r from-pink-300 to-pink-400 hover:from-pink-400 hover:to-pink-500 text-white rounded-xl btn-glow border-0 transition-all duration-300"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            저장하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
