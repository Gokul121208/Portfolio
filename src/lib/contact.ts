import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Please enter a valid email").max(120),
  message: z.string().trim().min(10, "Tell me a little more (10+ characters)").max(2000, "Please keep it under 2000 characters"),
});
export type ContactInput = z.infer<typeof contactSchema>;
