export class ResErrorDto<T> {
  statusCode: number;
  message: string;
  fields?: any[];
}

export class FactoryResErrorDto {
  static create<T>(
    err: any,
    opt?: { message?: string; fields?: any[] }
  ): ResErrorDto<T> {
    const resErrDto = new ResErrorDto();

    if (err.statusCode) {
      resErrDto.statusCode = err.statusCode;
      resErrDto.message = err.message;
    } else {
      resErrDto.statusCode = 400;
      resErrDto.message = opt?.message ?? 'Something went wrong';
    }

    resErrDto.fields = opt?.fields;

    return resErrDto;
  }
}
