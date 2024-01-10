/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
import type { NormalException } from '@destify-dev/shared-be-utils';
import type { INestApplication } from '@nestjs/common';
import type { ApiResponseOptions } from '@nestjs/swagger';

import { NodeEnv } from '@destify-dev/shared-be-utils';
import * as express from 'express';
import { Logger } from 'nestjs-pino';

/**
 * Returns the data wrapped by an object with data key.
 */
export const toSwaggerError = (
  exception: NormalException,
  options?: ApiResponseOptions
) => {
  return {
    content: { 'application/json': { example: exception.toJSON() } },
    ...options,
  };
};

/**
 * Encapsulate the init setup for bootstrap, E2E testing and swagger script resued
 */
export const initialize = (app: INestApplication) => {
  const { BASE_PATH, NODE_ENV } = process.env;

  app.useLogger(app.get(Logger));

  // Sentry.init({
  //   dsn: process.env.SENTRY_DSN,
  //   environment: process.env.SENTRY_ENVIRONMENT,
  //   release: `tzneststarter@${process.env.npm_package_version}`,
  // });

  app.enableVersioning();

  app.enableCors({
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS', 'DELETE', 'HEAD'],
    optionsSuccessStatus: 200,
    origin: [
      'https://travelzap.com',
      /\.travelzap\.com$/,
      'http://localhost:3000',
    ],
  });

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: false, limit: '50mb' }));
  const cookieParser = require('cookie-parser');
  app.use(cookieParser());

  // For convenience exclude to set base path when doing e2e test
  if (BASE_PATH && NODE_ENV !== NodeEnv.TEST) app.setGlobalPrefix(BASE_PATH);
};
