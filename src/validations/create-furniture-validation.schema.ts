import { array, z } from "zod";
import { FurnitureCategoryEnum } from "../models/furniture-category.enum";
import { FurnitureStateEnum } from "../models/furniture-state.enum";
import { MaterialEnum } from "../models/material.enum";
import { RoomsEnum } from "../models/rooms.enum";

export const createFurnitureValidationSchema = z.object({
  category: z.enum(Object.values(FurnitureCategoryEnum)),
  state: z.enum(Object.values(FurnitureStateEnum)),
  subtitle: z.string("Subtitle must be a string and required"),
  description: z.string("Description must be a string and required"),
  price: z
    .number("Price must be a number and required")
    .nonnegative("Price must be a positive number"),
  img_src: z.url(),
  color_id: z
    .number()
    .nonnegative("Color ID must be a positive number")
    .int("Color ID must be a integer number"),
  material: z.enum(Object.values(MaterialEnum)),
  room_category: z.enum(Object.values(RoomsEnum)),
});
