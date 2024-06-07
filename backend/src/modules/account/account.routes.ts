import { Router } from 'express';
import { authAccessMiddleware } from '../../middlewares';
import { accountController } from './controllers';

export const accountRoutes = Router();

accountRoutes.get('/profile', authAccessMiddleware, (req, res) =>
  accountController.getUserProfile(req, res)
);
