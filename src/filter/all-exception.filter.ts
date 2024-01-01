import type {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import type { Response } from 'express';
import type { FastifyReply } from 'fastify';

import { NormalException } from '@/exception';
import {
  Catch,
  HttpStatus,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as Sentry from '@sentry/node';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.error(exception.stack);
    this.logger.error(exception.message);

    if (
      !(
        exception instanceof NotFoundException ||
        exception instanceof UnauthorizedException
      )
    ) {
      Sentry.captureException(exception);
    }

    const ctx = host.switchToHttp();
    let response = null;
    try {
      response = ctx.getResponse<FastifyReply>();
    } catch (error) {
      response = ctx.getResponse<Response>();
    }

    response
      .status(exception?.getStatus?.() || HttpStatus.BAD_REQUEST)
      .send(NormalException.UNEXPECTED(exception?.message).toJSON());
  }
}
