import { TCreatePasswordSchema } from '@/app/(dashboard)/_components/_dialogs/_schema/create-password';
import { PasswordService } from '@/services/password/password-service';

export const createPassword = (data: TCreatePasswordSchema) =>
  PasswordService.create(data);
