import { PasswordService } from '@/services/password/password-service';

export const getPassword = (id: string, includePassword?: boolean) =>
  PasswordService.findOne(id, includePassword);
