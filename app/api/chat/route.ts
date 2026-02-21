import { streamText, convertToModelMessages } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { ModelProvider } from "@/lib/types/chatbot";

export async function POST(req: Request) {
  try {
    const { messages, model, provider, systemPrompt, apiKey } =
      await req.json();

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API Key가 필요합니다." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const aiModel = getModel(provider, model, apiKey);
    const coreMessages = await convertToModelMessages(messages);

    const result = await streamText({
      model: aiModel,
      system: systemPrompt,
      messages: coreMessages,
      maxRetries: 1,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(
      JSON.stringify({ error: "채팅 처리 중 오류가 발생했습니다." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

function getModel(provider: ModelProvider, modelId: string, apiKey: string) {
  switch (provider) {
    case "openai": {
      const openai = createOpenAI({ apiKey });
      return openai(modelId);
    }
    case "anthropic": {
      const anthropic = createAnthropic({ apiKey });
      return anthropic(modelId);
    }
    case "google": {
      const google = createGoogleGenerativeAI({ apiKey });
      return google(modelId);
    }
    default:
      throw new Error(`지원하지 않는 Provider: ${provider}`);
  }
}
