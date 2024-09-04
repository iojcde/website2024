import { openai } from "@ai-sdk/openai";
import { generateText, streamText } from "ai";

export const POST = async (req: Request) => {
  if (process.env.OPENAI_API_KEY === undefined) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  const { input, lang } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    system: `You are a system that helps people translate text. 
    You are given user input and need to translate it to another language. 
    You don't need to translate the text word by word, but you need to keep the meaning of the text. 
    For example, technical terms might not need to be translated.

    <translate-to-language>
      ${lang}
    </translate-to-language>
    `,
    prompt: input,
  });

  return result.toTextStreamResponse();
};
