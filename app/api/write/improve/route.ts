"use server";

import { streamObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { improveSchema } from "./schema";

export const POST = async (req: Request) => {
  const { input } = await req.json();

  if (process.env.OPENAI_API_KEY === undefined) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  const result = await streamObject({
    model: openai("gpt-4o"),
    system: `You are a system that helps people write better.
    You are given user input and need to improve it. Keep the improvements simple and consise.
    Reply with the improved text and a list of improvements. 
    
    `,
    prompt: input,
    schema: improveSchema,
  });

  return result.toTextStreamResponse();
};
