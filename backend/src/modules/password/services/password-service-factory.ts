import { PasswordServiceImpl } from './password-service-impl';
import { IPasswordService } from './password-service.interface';

export class PasswordServiceFactory {
  static getService(): IPasswordService {
    return new PasswordServiceImpl();
  }
}
