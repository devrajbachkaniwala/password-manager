import { PasswordService } from '@/services/password/password-service';

export const getPasswords = () => PasswordService.findAll();
