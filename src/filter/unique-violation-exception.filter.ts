import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import type { Response } from 'express';
import type { FastifyReply } from 'fastify';

import { UniqueViolation } from '@/exception';
import { ApiCodes } from '@/utils/apiCodes';
import { Catch, HttpStatus, Logger } from '@nestjs/common';

@Catch(UniqueViolation)
export class UniqueViolationFilter implements ExceptionFilter {
  private readonly logger = new Logger(UniqueViolationFilter.name);

  catch(exception: UniqueViolation, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    let response = null;
    try {
      response = ctx.getResponse<FastifyReply>();
    } catch (error) {
      response = ctx.getResponse<Response>();
    }

    response.status(exception?.getStatus?.() || HttpStatus.BAD_REQUEST).send({
      code: ApiCodes.AUTHORIZATION_ERROR,
      field: exception?.field,
      message: exception?.message,
    });
  }
}
