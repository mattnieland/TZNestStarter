import type { NestExpressApplication } from '@nestjs/platform-express';

import { AppConfig } from '@destify-dev/shared-be-utils';
import { AppModule } from '@mod/app';
import { NestFactory } from '@nestjs/core';

const { PORT } = process.env;

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    AppConfig.GetInstance(),
    { bufferLogs: true }
  );

  AppConfig.InitializeApp(app, 'tzneststarter');
  await app.listen(PORT, '0.0.0.0');
};
bootstrap();
