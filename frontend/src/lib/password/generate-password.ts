import { TGeneratePasswordSchema } from '@/app/(dashboard)/_components/_dialogs/_schema/generate-password';
import { PasswordService } from '@/services/password/password-service';

export const generatePassword = (data: TGeneratePasswordSchema) =>
  PasswordService.generate(data);
