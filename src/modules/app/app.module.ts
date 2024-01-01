/* eslint-disable import/no-extraneous-dependencies */
import type { ValidationError } from '@nestjs/common';
import type { I18nValidationError } from 'nestjs-i18n';

import {
  AllExceptionFilter,
  NormalExceptionFilter,
  UnauthorizedExceptionFilter,
  UniqueViolationFilter,
  ValidationExceptionFilter,
} from '@/filter';
import { ResponseInterceptor } from '@/interceptor/response.interceptor';
import { ApiCodes } from '@/utils/apiCodes';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  I18nValidationExceptionFilter,
  I18nValidationPipe,
  QueryResolver,
} from 'nestjs-i18n';
import { LoggerModule } from 'nestjs-pino';
import { join } from 'path';

import { AppConfig } from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  imports: [
    // Allow to access .env file and validate env variables
    ConfigModule.forRoot(AppConfig.getInitConifg()),
    // Logger framework that better then NestJS default logger
    LoggerModule.forRoot(AppConfig.getLoggerConfig()),
    // Extend for external logging
    // LoggerModule.forRoot(AppConfig.getExternalLoggerConfig()),
    // rate limiter
    ThrottlerModule.forRoot([
      {
        limit: 1000,
        ttl: 60000,
      },
    ]),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(
          __dirname,
          process.env.NODE_ENV === 'prod' ? '/i18n/' : '../../i18n/'
        ),
        watch: true,
      },
      resolvers: [
        { options: ['lang'], use: QueryResolver },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    AppService,
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    { provide: APP_FILTER, useClass: NormalExceptionFilter },
    { provide: APP_FILTER, useClass: UnauthorizedExceptionFilter },

    { provide: APP_FILTER, useClass: UniqueViolationFilter },
    { provide: APP_FILTER, useClass: ValidationExceptionFilter },
    {
      provide: APP_FILTER,
      useFactory: () =>
        new I18nValidationExceptionFilter({
          responseBodyFormatter(host, exc, formattedErrors) {
            const message = Array.isArray(formattedErrors)
              ? formattedErrors[0]
              : formattedErrors;

            const error = (
              Array.isArray(exc.errors) ? exc.errors[0] : exc
            ) as I18nValidationError;
            const field = error?.property || 'unknown';
            return {
              code: ApiCodes.VALIDATION_ERROR,
              field,
              message,
            };
          },
        }),
    },
    {
      provide: APP_PIPE,
      useFactory: () =>
        new I18nValidationPipe({
          forbidNonWhitelisted: true,
          whitelist: true,
        }),
    },
    {
      /**
       * Allowing to do validation through DTO
       * since class-validator library default throw BadRequestException, here we use exceptionFactory to throw
       * their internal exception so that filter can recognize it
       */
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          exceptionFactory: (errors: ValidationError[]) => {
            return errors[0];
          },
          forbidNonWhitelisted: true,
        }),
    },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
})
export class AppModule {}
