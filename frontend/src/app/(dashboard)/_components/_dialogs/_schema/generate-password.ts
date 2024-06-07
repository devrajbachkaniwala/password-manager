import { z } from 'zod';

export const EIncludeOpts = z.enum([
  'lowerCase',
  'upperCase',
  'digits',
  'specialChar'
]);

export const generatePasswordSchema = z
  .object({
    passwordLen: z.coerce.number().min(8).max(20),
    lowerCase: z.boolean().optional(),
    upperCase: z.boolean().optional(),
    digits: z.boolean().optional(),
    specialChar: z.boolean().optional()
  })
  .partial();

export type TGeneratePasswordSchema = z.infer<typeof generatePasswordSchema>;
