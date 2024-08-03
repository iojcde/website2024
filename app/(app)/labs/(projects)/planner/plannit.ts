"use server";

import { generateObject } from "ai";
import { createOpenAI, openai } from "@ai-sdk/openai";
import { z } from "zod";

import "server-only";
export const plannit = async ({
  constraints,
  date,
  rest,
}: {
  constraints: string[];
  date: string;
  rest: number;
}) => {
  if (process.env.OPENAI_API_KEY === undefined) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    prompt: `You are a system that helps people plan your day based on their constraints.
    Current time to use as reference point: ${date}. Consider typical meal times and make plans that include them.
    The user requested ${rest}mins of rest time. Place rest times between activities
    You MUST say all activities in the language of the constraints supplied. If the user is a student, don't plan activities during typical school times(ex: 8am-3pm).

    Generate a maximum of 3 schedules according to the below constraints so the user can choose 1. Ignore duplicates.
        
    Contstraints user supplied: ${constraints.join(" | ")}`,
    schema: z.object({
      schedules: z.array(
        z.object({
          items: z.array(
            z.object({
              start: z.string({ description: "ex) 2 PM" }),
              end: z.string(),
              activity: z.string({
                description: "In the language of the constraints supplied.",
              }),
            })
          ),
        })
      ),
    }),
  });

  return object;
};
