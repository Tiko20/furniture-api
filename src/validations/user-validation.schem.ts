import z from "zod";

export const userValidationSchema = z.object({
  username: z.string().min(8, "Username must be at least 8 characters long"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
