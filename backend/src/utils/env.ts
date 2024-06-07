import { config } from 'dotenv';
config();

export class Env {
  static get DB_CONNECTION_STRING(): string {
    return process.env.DB_CONNECTION_STRING ?? '';
  }

  static get PORT(): number {
    return process.env.PORT ? +process.env.PORT : 3001;
  }

  static get JWT_ACCESS_SALT(): string {
    return process.env.JWT_ACCESS_SALT ?? '';
  }

  static get JWT_REFRESH_SALT(): string {
    return process.env.JWT_REFRESH_SALT ?? '';
  }

  static get SECRET_SALT(): string {
    return process.env.SECRET_SALT ?? '';
  }
}
