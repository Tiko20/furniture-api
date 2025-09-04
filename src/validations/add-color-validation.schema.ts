import {z} from "zod";

export const addColorValidationSchema = z.object({
  name: z.string("Name must be a string").min(1, "Name cannot be empty"),
  code: z
    .string("Code must be a string")
    .min(1, "Code Cannot be empty")
    .regex(
      /^#([0-9A-Fa-f]{6})$/,
      "Code must be a valid hex color (e.g. #FF0000)"
    ),
  title: z.string("Title must be a string").min(1, "Title cannot be empty"),
});
