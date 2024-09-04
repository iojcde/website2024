import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { suggestSchema } from "./schema";

export const POST = async (req: Request) => {
  const { input } = await req.json();

  if (process.env.OPENAI_API_KEY === undefined) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  const result = await streamObject({
    model: openai("gpt-4o-mini"),
    // model: groq("llama-3.1-70b-versatile"),
    system: `You are a system that helps people write better. 
    You are given user input and need to write auto-completions and suggest topics to write about. 
    Reply in the user's language.

    Be detailed and don't give generalized topics as auto-completions. 
    Instead, give detailed auto-completions for the user's sentence.

 
    `,
    prompt: input,
    schema: suggestSchema,
  });

  return result.toTextStreamResponse();
};
