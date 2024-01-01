import { HttpException, HttpStatus } from '@nestjs/common';

export class UniqueViolation extends HttpException {
  field: string;

  message: string;

  constructor(message: string, field: string) {
    super(
      {
        field,
        message,
      },
      HttpStatus.CONFLICT
    );
  }
}
