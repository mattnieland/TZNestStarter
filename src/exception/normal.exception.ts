import type { FailResponse, HttpFailResponse } from '@share/interfaces';

import { ApiCodes } from '@/utils/apiCodes';
import { HttpException, HttpStatus } from '@nestjs/common';

export class NormalException extends HttpException {
  static AUTHORIZATION_ERROR = (msg?: string) => {
    return new NormalException(
      msg || 'Authorization Error',
      ApiCodes.AUTHORIZATION_ERROR
    );
  };

  static HTTP_REQUEST_TIMEOUT = () => {
    return new NormalException(
      'HTTP Request Timeout',
      ApiCodes.HTTP_REQUEST_TIMEOUT
    );
  };

  static UNEXPECTED = (msg?: string) => {
    return new NormalException(msg || 'Unexpected Error', ApiCodes.UNEXPECTED);
  };

  static VALIDATION_ERROR = (msg?: string) => {
    return new NormalException(
      msg || 'Validation Error',
      ApiCodes.VALIDATION_ERROR
    );
  };

  constructor(message: string, code: number) {
    super({ code, message }, HttpStatus.BAD_REQUEST);
  }

  // @Override
  getResponse(): FailResponse {
    return <FailResponse>super.getResponse();
  }

  toJSON(): HttpFailResponse {
    const response = this.getResponse();
    return {
      error: {
        code: response.code,
        message: response.message,
      },
    };
  }
}
