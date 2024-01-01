import { UnauthorizedException } from '@nestjs/common';

export class TZUnauthorizedException extends UnauthorizedException {
  field: string;

  message: string;

  constructor(message: string, field: string) {
    super(message);
    this.field = field;
    this.message = message;
  }
}
