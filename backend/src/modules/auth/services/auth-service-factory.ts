import { IAuthService } from './auth-service.interface';
import { AuthServiceImpl } from './auth.service-impl';

export class AuthServiceFactory {
  static getService(): IAuthService {
    return new AuthServiceImpl();
  }
}
