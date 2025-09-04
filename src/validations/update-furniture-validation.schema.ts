import { z } from "zod";
import { FurnitureStateEnum } from "../models/furniture-state.enum";

export const updateFurnitureValidationSchema = z.object({
  price: z
    .number("Price must be a number and required")
    .nonnegative("Price must be a positive number")
    .optional(),
  subtitle: z.string("Subtitle must be a string and required").optional(),
  description: z.string("Description must be a string and required").optional(),
  state: z.enum(Object.values(FurnitureStateEnum)).optional(),
});
