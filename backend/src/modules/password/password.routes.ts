import { Request, Router } from 'express';
import { passwordController } from './controllers';
import { schemaValidator } from '../../middlewares';
import {
  TUpdatePasswordDto,
  createPasswordSchema,
  updatePasswordSchema
} from './dto';
import { getPasswordQuerySchema } from './dto/get-password-query.dto';

export const passwordRoutes = Router();

passwordRoutes.post(
  '/',
  schemaValidator({ bodySchema: createPasswordSchema }),
  (req, res) => passwordController.create(req, res)
);

passwordRoutes.get(
  '/:passwordId',
  schemaValidator({ querySchema: getPasswordQuerySchema }),
  (req: Request<{ passwordId: string }>, res) =>
    passwordController.findOne(req, res)
);

passwordRoutes.get('/', (req, res) => passwordController.findAll(req, res));

passwordRoutes.patch(
  '/:passwordId',
  schemaValidator({ bodySchema: updatePasswordSchema }),
  (req: Request<{ passwordId: string }, any, TUpdatePasswordDto>, res) =>
    passwordController.update(req, res)
);

passwordRoutes.delete(
  '/:passwordId',
  (req: Request<{ passwordId: string }>, res) =>
    passwordController.remove(req, res)
);
