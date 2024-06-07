import { z } from 'zod';
import { createPasswordSchema } from './create-password.dto';

export const updatePasswordSchema = createPasswordSchema.partial();

export type TUpdatePasswordDto = z.infer<typeof updatePasswordSchema>;
