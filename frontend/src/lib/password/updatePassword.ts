import { TUpdatePasswordSchema } from '@/app/(dashboard)/_components/_dialogs/_schema/update-password';
import { PasswordService } from '@/services/password/password-service';

export const updatePassword = (id: string, data: TUpdatePasswordSchema) =>
  PasswordService.update(id, data);
