import { JwtPayload } from 'jsonwebtoken';
import { UserTo } from '../modules/auth';

export type TPayload = {
  user: UserTo;
} & JwtPayload;
