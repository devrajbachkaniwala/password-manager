import { Request, Response } from 'express';
import { TLoginUserDto, TLogoutUserDto, TRegisterUserDto } from '../dto';
import { FactoryResErrorDto, FactoryResSuccessDto } from '../../../dto';
import {
  AuthServiceFactory,
  IAuthService,
  UserTo,
  UserTokenTo
} from '../services';

class AuthController {
  private authService: IAuthService;

  constructor() {
    this.authService = AuthServiceFactory.getService();
  }

  async register(req: Request<any, any, TRegisterUserDto>, res: Response) {
    try {
      const user = await this.authService.register(req.body);

      res.status(201).json(FactoryResSuccessDto.create(user));
    } catch (err: any) {
      res.status(err.statusCode ?? 400).json(
        FactoryResErrorDto.create(err, {
          message: 'Failed to register a user'
        })
      );
    }
  }

  async login(req: Request<any, any, TLoginUserDto>, res: Response) {
    try {
      const tokensTo = await this.authService.login(req.body);

      res.status(200).json(FactoryResSuccessDto.create(tokensTo));
    } catch (err: any) {
      res.status(err.statusCode ?? 400).json(
        FactoryResErrorDto.create(err, {
          message: 'Failed to login a user'
        })
      );
    }
  }

  async token(req: Request, res: Response) {
    try {
      const { payload, userToken } = req as typeof req & {
        payload: { user: UserTo; jti: string };
        userToken: UserTokenTo;
      };
      const tokenTo = await this.authService.token(payload.user, userToken.id);

      res.status(200).json(FactoryResSuccessDto.create(tokenTo));
    } catch (err: any) {
      res.status(err.statusCode ?? 400).json(
        FactoryResErrorDto.create(err, {
          message: 'Failed to get acces token'
        })
      );
    }
  }

  async logout(req: Request<any, any, TLogoutUserDto>, res: Response) {
    try {
      const { payload, userToken } = req as typeof req & {
        payload: { user: UserTo; jti: string };
        userToken: UserTokenTo;
      };

      const logout = await this.authService.logout(
        payload.user.id,
        userToken.id,
        req.body.allDevices
      );

      let message = 'Successfully logged out';
      if (req.body.allDevices) {
        message += ' of all devices';
      }

      res.status(200).json(FactoryResSuccessDto.create({ message }));
    } catch (err: any) {
      res.status(err.statusCode ?? 400).json(
        FactoryResErrorDto.create(err, {
          message: 'Failed to logout'
        })
      );
    }
  }
}

export const authController = new AuthController();
