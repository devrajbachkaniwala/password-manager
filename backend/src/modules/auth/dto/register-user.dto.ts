import { z } from 'zod';

const passwordRegExp =
  /^(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

export const registerUserSchema = z
  .object({
    email: z.string().trim().email(),
    password: z.string().trim().min(8).max(20).regex(passwordRegExp, {
      message:
        'Password must include lowercase, uppercase, digit and special character'
    }),
    confirmPassword: z.string().trim()
  })
  .refine((obj) => obj.password === obj.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Confirm password does not match password'
  });

export type TRegisterUserDto = z.infer<typeof registerUserSchema>;
