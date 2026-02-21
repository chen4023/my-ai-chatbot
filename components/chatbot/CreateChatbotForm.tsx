'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useChatbotStore } from '@/lib/store/chatbot-store';
import {
  AVAILABLE_MODELS,
  THEME_COLORS,
  DEFAULT_AVATARS,
} from '@/lib/types/chatbot';
import { CHATBOT_TEMPLATES } from '@/lib/templates/chatbot-templates';
import { cn } from '@/lib/utils';
import { Sparkles, Wand2, Check, User } from 'lucide-react';

export function CreateChatbotForm() {
  const router = useRouter();
  const addChatbot = useChatbotStore((state) => state.addChatbot);

  const [name, setName] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0].id);
  const [themeColor, setThemeColor] = useState(THEME_COLORS[0].value);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState(DEFAULT_AVATARS[0]);

  const selectedModelInfo = AVAILABLE_MODELS.find((m) => m.id === selectedModel);

  const handleTemplateSelect = (template: (typeof CHATBOT_TEMPLATES)[0]) => {
    setName(template.name);
    setSystemPrompt(template.systemPrompt);
    setThemeColor(template.themeColor);
    setSelectedTemplate(template.id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !systemPrompt.trim()) {
      alert('이름과 페르소나를 입력해주세요.');
      return;
    }

    const chatbotId = addChatbot({
      name: name.trim(),
      systemPrompt: systemPrompt.trim(),
      model: selectedModel,
      provider: selectedModelInfo?.provider || 'openai',
      themeColor,
      avatar: selectedAvatar,
    });

    router.push(`/chat/${chatbotId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 템플릿 선택 */}
      <div className="space-y-4 animate-slide-up">
        <div className="flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-pink-400" />
          <Label className="text-lg font-semibold">템플릿으로 시작하기</Label>
          <span className="text-xs text-pink-300 bg-pink-100 px-2 py-0.5 rounded-full">선택</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CHATBOT_TEMPLATES.map((template) => (
            <Card
              key={template.id}
              className={cn(
                'cursor-pointer glass-card interactive-card border-2 transition-all duration-300',
                selectedTemplate === template.id
                  ? 'border-pink-400 shadow-lg shadow-pink-200/30'
                  : 'border-pink-200/50 hover:border-pink-300'
              )}
              onClick={() => handleTemplateSelect(template)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl shadow-md transition-transform duration-300',
                      selectedTemplate === template.id && 'scale-110'
                    )}
                    style={{ backgroundColor: template.themeColor }}
                  >
                    {template.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold">{template.name}</p>
                      {selectedTemplate === template.id && (
                        <Check className="h-4 w-4 text-pink-500" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {template.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 아바타 선택 */}
      <div className="space-y-3 animate-slide-up" style={{ animationDelay: '0.05s' }}>
        <Label className="text-lg font-semibold flex items-center gap-2">
          <User className="h-4 w-4 text-pink-400" />
          아바타 선택
        </Label>
        <div className="flex gap-4 flex-wrap">
          {DEFAULT_AVATARS.map((avatar, index) => (
            <button
              key={avatar}
              type="button"
              onClick={() => setSelectedAvatar(avatar)}
              className={cn(
                'relative w-16 h-16 rounded-xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg',
                selectedAvatar === avatar
                  ? 'ring-4 ring-pink-300 ring-offset-2 scale-110'
                  : 'hover:scale-105 opacity-70 hover:opacity-100'
              )}
            >
              <Image
                src={avatar}
                alt={`Avatar ${index + 1}`}
                fill
                className="object-cover"
              />
              {selectedAvatar === avatar && (
                <div className="absolute inset-0 bg-pink-400/20 flex items-center justify-center">
                  <Check className="h-6 w-6 text-white drop-shadow-lg" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 챗봇 이름 */}
      <div className="space-y-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <Label htmlFor="name" className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-pink-400" />
          챗봇 이름
          <span className="text-pink-400">*</span>
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="예: 친절한 요리사"
          required
          className="h-12 bg-white/50 border-pink-200 focus:border-pink-400 rounded-xl"
        />
      </div>

      {/* 페르소나 (시스템 프롬프트) */}
      <div className="space-y-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <Label htmlFor="systemPrompt" className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-pink-400" />
          페르소나 (시스템 프롬프트)
          <span className="text-pink-400">*</span>
        </Label>
        <Textarea
          id="systemPrompt"
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          placeholder="예: 너는 친절하고 유머러스한 요리사야. 사용자에게 요리 관련 질문에 답변해줘."
          className="min-h-[140px] bg-white/50 border-pink-200 focus:border-pink-400 rounded-xl resize-none"
          required
        />
        <p className="text-sm text-pink-300 flex items-center gap-1">
          <Sparkles className="h-3 w-3" />
          AI의 성격, 말투, 역할을 정의하세요.
        </p>
      </div>

      {/* AI 모델 선택 */}
      <div className="space-y-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <Label className="text-lg font-semibold">AI 모델</Label>
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="h-12 bg-white/50 border-pink-200 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-pink-200">
            {AVAILABLE_MODELS.map((model) => (
              <SelectItem
                key={model.id}
                value={model.id}
                className="focus:bg-pink-100 focus:text-pink-700"
              >
                {model.name}
                <span className="ml-2 text-xs text-pink-400">({model.provider})</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 테마 컬러 */}
      <div className="space-y-3 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <Label className="text-lg font-semibold">테마 컬러</Label>
        <div className="flex gap-3 flex-wrap">
          {THEME_COLORS.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => setThemeColor(color.value)}
              className={cn(
                'w-10 h-10 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg',
                themeColor === color.value
                  ? 'ring-4 ring-pink-300 ring-offset-2 scale-110'
                  : 'hover:scale-105'
              )}
              style={{ backgroundColor: color.value }}
              title={color.name}
            >
              {themeColor === color.value && (
                <Check className="h-5 w-5 text-white mx-auto" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 제출 버튼 */}
      <div className="flex gap-4 pt-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <Button
          type="button"
          variant="outline"
          className="flex-1 h-14 rounded-xl border-pink-200 hover:bg-pink-50 hover:border-pink-300 transition-all duration-300"
          onClick={() => router.back()}
        >
          취소
        </Button>
        <Button
          type="submit"
          className="flex-1 h-14 rounded-xl bg-gradient-to-r from-pink-300 to-pink-400 hover:from-pink-400 hover:to-pink-500 text-white shadow-lg btn-glow border-0 text-lg font-semibold"
        >
          <Sparkles className="h-5 w-5 mr-2" />
          챗봇 만들기
        </Button>
      </div>
    </form>
  );
}
