/* eslint-disable import/no-extraneous-dependencies */
import type { ValidationError } from '@nestjs/common';

import {
  AllExceptionFilter,
  NormalExceptionFilter,
  ValidationExceptionFilter,
} from '@/filter';
import { ResponseInterceptor } from '@/interceptor/response.interceptor';
import { HttpException, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { SentryInterceptor } from '@ntegral/nestjs-sentry';
import { LoggerModule } from 'nestjs-pino';
import { RateLimiterGuard, RateLimiterModule } from 'nestjs-rate-limiter';

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
    // rate limiter
    RateLimiterModule.register({
      duration: 60,
      for: 'Fastify',
      points: 5,
      type: 'Memory',
    }),
    // // Sentry
    // SentryModule.forRoot({
    //   close: {
    //     enabled: true,
    //     // Time in milliseconds to forcefully quit the application
    //     timeout: 30,
    //   },
    //   debug: process.env.NODE_ENV === 'development',
    //   dsn: process.env.SENTRY_DSN,
    //   environment: process.env.NODE_ENV,
    //   logLevels: ['debug'],
    // }),
    // // Database connection
    // TypeOrmModule.forFeature([
    //   // list of entities
    // ]),
    // TypeOrmModule.forRoot({
    //   database: process.env.DB_DATABASE,
    //   entities: [Hotel, Country, City, Room, Contact, Venue, Package],
    //   host: process.env.DB_HOST,
    //   logging: process.env.NODE_ENV === 'development',
    //   password: process.env.DB_PASSWORD,
    //   port: process.env.DB_PORT,
    //   synchronize: process.env.NODE_ENV === 'development',
    //   type: process.env.DB_TYPE as 'postgres',
    //   username: process.env.DB_USERNAME,
    // }),
  ],
  providers: [
    { provide: APP_GUARD, useClass: RateLimiterGuard },
    {
      provide: APP_INTERCEPTOR,
      useFactory: () =>
        new SentryInterceptor({
          filters: [
            {
              filter: (exception: HttpException) => exception.getStatus() < 500, // Only report 500 errors
              type: HttpException,
            },
          ],
        }),
    },
    AppService,
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    { provide: APP_FILTER, useClass: NormalExceptionFilter },
    { provide: APP_FILTER, useClass: ValidationExceptionFilter },
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
        }),
    },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
})
export class AppModule {}
