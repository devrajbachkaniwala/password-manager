import { TRegisterUserSchema } from '@/app/(auth)/register/_schema/register-user';
import { AuthService } from '@/services/auth/auth-service';

export const register = async (data: TRegisterUserSchema) =>
  AuthService.register(data);
