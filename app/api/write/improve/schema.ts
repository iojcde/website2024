import { z } from "zod";

export const improveSchema = z.object({
  improvedText: z.string({
    description: "improved text for the user's input.",
  }),
  improvements: z
    .array(
      z.object({
        description: z.string({
          description: "description of the improvement.",
        }),
        improvement: z.string({
          description:
            "improvement for the user's input. Highlight the changed parts with Markdown",
        }),
        original: z.string({
          description: "original text from the user.",
        }),
      })
    )
    .max(10),
});
