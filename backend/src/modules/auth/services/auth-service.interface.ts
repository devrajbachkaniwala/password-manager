import { TLoginUserDto, TRegisterUserDto } from '../dto';
import { TokenTo } from './token-to';
import { TokensTo } from './tokens-to';
import { UserTo } from './user-to';

export interface IAuthService {
  register(data: TRegisterUserDto): Promise<UserTo>;
  login(data: TLoginUserDto): Promise<TokensTo>;
  token(userTo: UserTo, userTokenId: string): Promise<TokenTo>;
  logout(
    userId: string,
    userTokenId: string,
    allDevices?: boolean
  ): Promise<boolean>;
}
