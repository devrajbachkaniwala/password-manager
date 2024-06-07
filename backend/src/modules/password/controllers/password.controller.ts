import { Request, Response } from 'express';
import {
  TCreatePasswordDto,
  TGeneratePasswordQueryDto,
  TUpdatePasswordDto
} from '../dto';
import { FactoryResErrorDto, FactoryResSuccessDto } from '../../../dto';
import { TPayload } from '../../../types';
import { IPasswordService, PasswordServiceFactory } from '../services';
import {
  EGetPasswordInclude,
  TGetPasswordQueryDto
} from '../dto/get-password-query.dto';

class PasswordController {
  private passwordService: IPasswordService;

  constructor() {
    this.passwordService = PasswordServiceFactory.getService();
  }

  async create(req: Request<any, any, TCreatePasswordDto>, res: Response) {
    try {
      const { payload } = req as typeof req & { payload: TPayload };

      const password = await this.passwordService.create(
        payload.user.id,
        req.body
      );

      res.status(201).json(FactoryResSuccessDto.create(password));
    } catch (err: any) {
      console.log(err);
      res.status(err.statusCode ?? 400).json(
        FactoryResErrorDto.create(err, {
          message: 'Failed to create a password'
        })
      );
    }
  }

  async findOne(
    req: Request<{ passwordId: string }, any, any, TGetPasswordQueryDto>,
    res: Response
  ) {
    try {
      const { payload, params, query } = req as typeof req & {
        payload: TPayload;
      };

      const password = await this.passwordService.findOneByUserId(
        payload.user.id,
        params.passwordId,
        query.include === EGetPasswordInclude.Values.password
      );

      res.status(200).json(FactoryResSuccessDto.create(password));
    } catch (err: any) {
      console.log(err);
      res.status(err.statusCode ?? 400).json(
        FactoryResErrorDto.create(err, {
          message: 'Failed to get a password'
        })
      );
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const { payload } = req as typeof req & { payload: TPayload };

      const passwords = await this.passwordService.findAllByUserId(
        payload.user.id
      );

      res.status(200).json(FactoryResSuccessDto.create(passwords));
    } catch (err: any) {
      console.log(err);
      res.status(err.statusCode ?? 400).json(
        FactoryResErrorDto.create(err, {
          message: 'Failed to get passwords'
        })
      );
    }
  }

  async update(
    req: Request<{ passwordId: string }, any, TUpdatePasswordDto>,
    res: Response
  ) {
    try {
      const { payload, params } = req as typeof req & { payload: TPayload };

      const password = await this.passwordService.update(
        payload.user.id,
        params.passwordId,
        req.body
      );

      res.status(200).json(FactoryResSuccessDto.create(password));
    } catch (err: any) {
      console.log(err);
      res.status(err.statusCode ?? 400).json(
        FactoryResErrorDto.create(err, {
          message: 'Failed to update a password'
        })
      );
    }
  }

  async remove(req: Request<{ passwordId: string }>, res: Response) {
    try {
      const { payload, params } = req as typeof req & { payload: TPayload };

      const password = await this.passwordService.remove(
        payload.user.id,
        params.passwordId
      );

      res.status(200).json(
        FactoryResSuccessDto.create({
          message: 'Password successfully removed'
        })
      );
    } catch (err: any) {
      console.log(err);
      res.status(err.statusCode ?? 400).json(
        FactoryResErrorDto.create(err, {
          message: 'Failed to remove a password'
        })
      );
    }
  }

  generatePassword(
    req: Request<any, any, any, TGeneratePasswordQueryDto>,
    res: Response
  ) {
    try {
      const password = this.passwordService.generatePassword(req.query);

      res.status(200).json(
        FactoryResSuccessDto.create({
          password
        })
      );
    } catch (err: any) {
      console.log(err);
      res.status(err.statusCode ?? 400).json(
        FactoryResErrorDto.create(err, {
          message: 'Failed to generate a password'
        })
      );
    }
  }
}

export const passwordController = new PasswordController();
