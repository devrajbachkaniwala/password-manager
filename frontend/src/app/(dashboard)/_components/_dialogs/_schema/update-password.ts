import { z } from 'zod';
import { createPasswordSchema } from './create-password';

export const updatePasswordSchema = createPasswordSchema.partial();

export type TUpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
