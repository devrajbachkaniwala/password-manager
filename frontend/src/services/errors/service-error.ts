import { AxiosError } from 'axios';

export class ServiceError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class ServiceErrorFactory {
  static create(err: any, message?: string) {
    let msg = '';
    if (err instanceof AxiosError) {
      msg = err.response?.data?.message ?? message;
    } else {
      msg = message ?? err.message;
    }
    return new ServiceError(msg);
  }
}
