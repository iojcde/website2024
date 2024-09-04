import { z } from "zod";

export const translateSchema = z.object({
  output: z.string({
    description: "translated text.",
  }),
});
