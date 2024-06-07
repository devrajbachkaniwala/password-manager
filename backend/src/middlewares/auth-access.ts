import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Env } from '../utils';
import { FactoryUserTokenTo, UserTo, UserTokenTo } from '../modules/auth';
import { daoFactory } from '../dao';
import { FactoryResErrorDto } from '../dto';
import { AuthError } from '../modules/auth/errors';

export async function authAccessMiddleware(
  req: Request & {
    payload: { user: UserTo } & JwtPayload;
    userToken: UserTokenTo;
  },
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      throw new AuthError('Access token not provided');
    }

    const tokenPayload = verify(token, Env.JWT_ACCESS_SALT);
    if (typeof tokenPayload === 'string') {
      throw new AuthError('Invalid token');
    }

    const userTokenExist = await daoFactory
      .getUserTokenDao()
      .findOneByAccessJti(tokenPayload.jti);

    if (!userTokenExist || userTokenExist.userId !== tokenPayload.sub) {
      throw new AuthError('Invalid token');
    }

    if (userTokenExist.accessJtiExpiresAt < new Date()) {
      throw new AuthError('Token expired');
    }

    req.payload = tokenPayload as JwtPayload & { user: UserTo };
    req.userToken =
      FactoryUserTokenTo.createFromUserTokenEntityTo(userTokenExist);

    return next();
  } catch (err: any) {
    console.log(err);
    res
      .status(err.statusCode ?? 401)
      .json(FactoryResErrorDto.create(err, { message: 'UNAUTHORIZED' }));
  }
}
