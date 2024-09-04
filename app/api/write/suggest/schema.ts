import { z } from "zod";
export const suggestSchema = z.object({
  suggestedCompletions: z
    .array(
      z.string({
        description: "detailed auto-completion for the user's input.",
      })
    )
    .max(10),
});
