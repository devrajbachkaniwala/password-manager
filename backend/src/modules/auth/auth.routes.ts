import { loginUserSchema, logoutUserSchema, registerUserSchema } from './dto';
import {
  authAccessMiddleware,
  authRefreshMiddleware,
  schemaValidator
} from '../../middlewares';
import { Router } from 'express';
import { authController } from './controllers';

export const authRoutes = Router();

authRoutes.post(
  '/register',
  schemaValidator({ bodySchema: registerUserSchema }),
  (req, res) => authController.register(req, res)
);

authRoutes.post(
  '/login',
  schemaValidator({ bodySchema: loginUserSchema }),
  (req, res) => authController.login(req, res)
);

authRoutes.post('/token', authRefreshMiddleware, (req, res) =>
  authController.token(req, res)
);

authRoutes.post(
  '/logout',
  authAccessMiddleware,
  schemaValidator({ bodySchema: logoutUserSchema }),
  (req, res) => authController.logout(req, res)
);
