import { z } from 'zod';

export const EGetPasswordInclude = z.enum(['password']);

export const getPasswordQuerySchema = z
  .object({
    include: z.optional(z.string())
  })
  .partial();

export type TGetPasswordQueryDto = z.infer<typeof getPasswordQuerySchema>;
