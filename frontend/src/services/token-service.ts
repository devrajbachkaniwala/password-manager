import { LocalStorage } from './local-storage';
import { SessionStorage } from './session-storage';

export class TokenService {
  static getAccessToken(): string | null {
    return SessionStorage.get('accessToken');
  }

  static setAccessToken(value: string): void {
    SessionStorage.set('accessToken', value);
  }

  static getRefreshToken(): string | null {
    return LocalStorage.get('refreshToken');
  }

  static setRefreshToken(value: string): void {
    LocalStorage.set('refreshToken', value);
  }

  static clear() {
    SessionStorage.clear();
    LocalStorage.clear();
  }
}
