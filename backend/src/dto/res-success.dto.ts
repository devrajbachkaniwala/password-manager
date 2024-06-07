export class ResSuccessDto<T> {
  constructor(public readonly data: T) {}
}

export class FactoryResSuccessDto {
  static create<T>(data: T): ResSuccessDto<T> {
    return new ResSuccessDto(data);
  }
}
