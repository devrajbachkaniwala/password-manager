import { Request, Router } from 'express';
import { authRoutes } from './auth';
import { authAccessMiddleware, schemaValidator } from '../middlewares';
import {
  TGeneratePasswordQueryDto,
  generatePasswordQuerySchema,
  passwordController,
  passwordRoutes
} from './password';
import { accountRoutes } from './account';

const router = Router();

export const routes = {
  authRoutes: router.use('/auth', authRoutes),
  accountRoutes: router.use('/account', accountRoutes),
  passwordRoutes: router.use(
    '/passwords',
    authAccessMiddleware,
    passwordRoutes
  ),
  generatePasswordRoute: router.get(
    '/generate-password',
    schemaValidator({ querySchema: generatePasswordQuerySchema }),
    (req: Request<any, any, any, TGeneratePasswordQueryDto>, res) =>
      passwordController.generatePassword(req, res)
  )
};
