export class PasswordError extends Error {
  constructor(message: string, public readonly statusCode: number = 400) {
    super(message);
  }
}

export class PasswordErrorFactory {
  static create(err: any, message: string): PasswordError {
    if (err instanceof PasswordError) {
      return err;
    }

    return new PasswordError(message);
  }
}
