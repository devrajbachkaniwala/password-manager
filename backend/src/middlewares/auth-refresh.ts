import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Env } from '../utils';
import { FactoryUserTokenTo, UserTo, UserTokenTo } from '../modules/auth';
import { daoFactory } from '../dao';
import { AuthError } from '../modules/auth/errors';
import { FactoryResErrorDto } from '../dto';

export async function authRefreshMiddleware(
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
      throw new AuthError('Refresh token not provided');
    }

    const tokenPayload = verify(token, Env.JWT_REFRESH_SALT);
    if (typeof tokenPayload === 'string') {
      throw new AuthError('Invalid token');
    }

    const userTokenExist = await daoFactory
      .getUserTokenDao()
      .findOneByRefreshJti(tokenPayload.jti);

    if (!userTokenExist || userTokenExist.userId !== tokenPayload.sub) {
      throw new AuthError('Invalid token');
    }

    if (userTokenExist.refreshJtiExpiresAt < new Date()) {
      throw new AuthError('Token expired');
    }

    req.payload = tokenPayload as JwtPayload & {
      user: UserTo;
    };
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
