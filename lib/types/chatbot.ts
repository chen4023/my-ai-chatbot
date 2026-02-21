export type ModelProvider = "openai" | "anthropic" | "google";

export interface ModelOption {
  id: string;
  name: string;
  provider: ModelProvider;
}

export const AVAILABLE_MODELS: ModelOption[] = [
  { id: "gpt-4o", name: "GPT-4o", provider: "openai" },
  { id: "gpt-4o-mini", name: "GPT-4o Mini", provider: "openai" },
  {
    id: "claude-3-5-sonnet-20241022",
    name: "Claude 3.5 Sonnet",
    provider: "anthropic",
  },
  {
    id: "claude-3-5-haiku-20241022",
    name: "Claude 3.5 Haiku",
    provider: "anthropic",
  },
  { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", provider: "google" },
  {
    id: "gemini-2.0-flash-lite",
    name: "Gemini 2.0 Flash Lite",
    provider: "google",
  },
];

export interface Chatbot {
  id: string;
  name: string;
  avatar: string;
  model: string;
  provider: ModelProvider;
  systemPrompt: string;
  themeColor: string;
  createdAt: number;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
}

export interface ChatSession {
  chatbotId: string;
  messages: Message[];
}

export const THEME_COLORS = [
  { name: "Blue", value: "#93C5FD" },
  { name: "Purple", value: "#C4B5FD" },
  { name: "Pink", value: "#F9A8D4" },
  { name: "Green", value: "#86EFAC" },
  { name: "Orange", value: "#FDBA74" },
  { name: "Red", value: "#FCA5A5" },
];

export const DEFAULT_AVATARS = [
  "/split_image_1.png",
  "/split_image_2.png",
  "/split_image_3.png",
  "/split_image_4.png",
];
