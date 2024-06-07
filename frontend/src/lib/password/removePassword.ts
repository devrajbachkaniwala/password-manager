import { PasswordService } from '@/services/password/password-service';

export const removePassword = (id: string) => PasswordService.delete(id);
