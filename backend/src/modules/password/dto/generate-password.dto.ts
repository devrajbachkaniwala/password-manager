import { z } from 'zod';

export const EIncludeOpts = z.enum([
  'lowerCase',
  'upperCase',
  'digits',
  'specialChar'
]);

export const generatePasswordQuerySchema = z
  .object({
    passwordLen: z.coerce.number().min(8).max(20),
    include: z
      .string()
      .trim()
      .transform((val) => (val.length ? val.split(',') : []))
  })
  .partial();

export type TGeneratePasswordQueryDto = z.infer<
  typeof generatePasswordQuerySchema
>;
