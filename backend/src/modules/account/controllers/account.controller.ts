import { Request, Response } from 'express';
import { UserTo } from '../../auth';
import { FactoryResErrorDto, FactoryResSuccessDto } from '../../../dto';
import { AccountServiceFactory, IAccountService } from '../services';

class AccountController {
  private accountService: IAccountService;

  constructor() {
    this.accountService = AccountServiceFactory.getService();
  }

  async getUserProfile(req: Request, res: Response) {
    try {
      const { payload } = req as typeof req & {
        payload: { user: UserTo; jti: string };
      };
      console.log('getUserProfile called');
      const userTo = await this.accountService.getUserProfile(payload.user.id);

      res.status(200).json(FactoryResSuccessDto.create(userTo));
    } catch (err: any) {
      res.status(err.statusCode ?? 400).json(
        FactoryResErrorDto.create(err, {
          message: 'Failed to get user profile'
        })
      );
    }
  }
}

export const accountController = new AccountController();
