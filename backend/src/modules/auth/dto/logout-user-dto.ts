import { z } from 'zod';

export const logoutUserSchema = z.object({
  allDevices: z.boolean().optional()
});

export type TLogoutUserDto = z.infer<typeof logoutUserSchema>;
