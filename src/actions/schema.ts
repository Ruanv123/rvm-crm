import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string(),
  password: z.string(),
  phone: z.string(),
  role: z.string(),
});
