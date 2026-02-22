'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useChatbotStore } from '@/lib/store/chatbot-store';
import {
  AVAILABLE_MODELS,
  THEME_COLORS,
  DEFAULT_AVATARS,
} from '@/lib/types/chatbot';
import type { ChatbotTemplate } from '@/lib/templates/chatbot-templates';

interface FormState {
  name: string;
  systemPrompt: string;
  selectedModel: string;
  themeColor: string;
  selectedTemplate: string | null;
  selectedAvatar: string;
}

export function useCreateChatbotForm() {
  const router = useRouter();
  const addChatbot = useChatbotStore((state) => state.addChatbot);

  const [formState, setFormState] = useState<FormState>({
    name: '',
    systemPrompt: '',
    selectedModel: AVAILABLE_MODELS[0].id,
    themeColor: THEME_COLORS[0].value,
    selectedTemplate: null,
    selectedAvatar: DEFAULT_AVATARS[0],
  });

  const selectedModelInfo = AVAILABLE_MODELS.find(
    (m) => m.id === formState.selectedModel
  );

  // 개별 필드 업데이트
  const updateField = useCallback(<K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  }, []);

  // 템플릿 선택 시 여러 필드 한번에 업데이트
  const selectTemplate = useCallback((template: ChatbotTemplate) => {
    setFormState((prev) => ({
      ...prev,
      name: template.name,
      systemPrompt: template.systemPrompt,
      themeColor: template.themeColor,
      selectedTemplate: template.id,
    }));
  }, []);

  // 폼 제출
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    const { name, systemPrompt, selectedModel, themeColor, selectedAvatar } = formState;

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
  }, [formState, selectedModelInfo, addChatbot, router]);

  // 취소
  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  return {
    formState,
    updateField,
    selectTemplate,
    handleSubmit,
    handleCancel,
    selectedModelInfo,
  };
}

// 선택 가능한 아이템 Hook (아바타, 테마 컬러 등)
export function useSelectable<T>(
  initialValue: T,
  onChange?: (value: T) => void
) {
  const [selected, setSelected] = useState<T>(initialValue);

  const select = useCallback((value: T) => {
    setSelected(value);
    onChange?.(value);
  }, [onChange]);

  const isSelected = useCallback((value: T) => {
    return selected === value;
  }, [selected]);

  return { selected, select, isSelected };
}
