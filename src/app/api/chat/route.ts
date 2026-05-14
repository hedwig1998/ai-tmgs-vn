import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { getServerSession } from "next-auth/next";

export const maxDuration = 30; // 30 seconds

export async function POST(req: Request) {
  const session = await getServerSession();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { messages } = await req.json();

  const localAI = createOpenAI({
    baseURL: process.env.LOCAL_AI_API_URL || "http://localhost:8000/v1",
    apiKey: "dummy-key", // Local AI servers usually don't require an API key, or accept anything
  });

  const result = streamText({
    model: localAI("default-model"), // The local model name might need to be configured, using a default
    messages,
  });

  return result.toTextStreamResponse();
}
