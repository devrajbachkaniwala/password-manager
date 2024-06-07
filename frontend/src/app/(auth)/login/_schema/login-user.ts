import { z } from 'zod';

export const loginUserSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim()
});

export type TLoginUserSchema = z.infer<typeof loginUserSchema>;
