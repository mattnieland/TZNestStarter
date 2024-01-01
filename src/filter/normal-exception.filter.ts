import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import type { Response } from 'express';
import type { FastifyReply } from 'fastify';

import { NormalException } from '@/exception';
import { Catch, HttpStatus, Logger } from '@nestjs/common';

@Catch(NormalException)
export class NormalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(NormalExceptionFilter.name);

  catch(exception: NormalException, host: ArgumentsHost) {
    this.logger.error(exception.stack);
    this.logger.error(exception.message);

    const ctx = host.switchToHttp();
    let response = null;
    try {
      response = ctx.getResponse<FastifyReply>();
    } catch (error) {
      response = ctx.getResponse<Response>();
    }

    response.status(HttpStatus.BAD_REQUEST).send(exception.toJSON());
  }
}
