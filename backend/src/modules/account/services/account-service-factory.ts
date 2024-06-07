import { AccountServiceImpl } from './account-service-impl';
import { IAccountService } from './account-service.interface';

export class AccountServiceFactory {
  static getService(): IAccountService {
    return new AccountServiceImpl();
  }
}
