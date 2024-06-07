import { z } from 'zod';

export const createPasswordSchema = z.object({
  title: z.string().trim().min(1).max(100),
  url: z.optional(z.string().trim()),
  username: z.string().trim().min(1).max(100),
  password: z.string().trim().min(1).max(50)
});

export type TCreatePasswordDto = z.infer<typeof createPasswordSchema>;
