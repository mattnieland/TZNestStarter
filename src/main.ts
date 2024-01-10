/* eslint-disable import/no-extraneous-dependencies */
import type { NestExpressApplication } from '@nestjs/platform-express';

import { AppConfig, AppModule } from '@mod/app';
import { NestFactory } from '@nestjs/core';
import { clusterize } from '@util/clustering';
import { initialize } from '@util/helper';

const { CLUSTERING, PORT } = process.env;

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    AppConfig.getInstance(),
    { bufferLogs: true }
  );

  initialize(app);

  // By default, Fastify only listens localhost, so we should to specify '0.0.0.0'
  app.listen(PORT, '0.0.0.0');
};
if (CLUSTERING === 'true') clusterize(bootstrap);
else bootstrap();
