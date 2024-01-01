import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import type { Response } from 'express';
import type { FastifyReply } from 'fastify';

import { TZUnauthorizedException } from '@/exception/unauthorized.exception';
import { ApiCodes } from '@/utils/apiCodes';
import {
  Catch,
  HttpStatus,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

@Catch(TZUnauthorizedException, UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(UnauthorizedExceptionFilter.name);

  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    let response = null;
    try {
      response = ctx.getResponse<FastifyReply>();
    } catch (error) {
      response = ctx.getResponse<Response>();
    }

    response.status(exception?.getStatus?.() || HttpStatus.BAD_REQUEST).send({
      code: ApiCodes.AUTHORIZATION_ERROR,
      field:
        exception instanceof TZUnauthorizedException
          ? exception?.field
          : 'unknown',
      message: exception?.message,
    });
  }
}
