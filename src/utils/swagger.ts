import type { NestExpressApplication } from '@nestjs/platform-express';

import { AppConfig } from '@destify-dev/shared-be-utils';
import { AppModule } from '@mod/app';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

/**
 * Generate Swagger JSON Schema offline, it used to deploy the document to other server but not the
 * current service (e.g. GitHub Pages)
 */
(async () => {
  const { npm_package_description, npm_package_name, npm_package_version } =
    process.env;

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    AppConfig.GetInstance(),
    { logger: false }
  );

  AppConfig.InitializeApp(app, 'users-service');

  const swaggerDoc = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle(npm_package_name)
      .setDescription(npm_package_description)
      .setVersion(npm_package_version)
      // .addServer(`http://localhost:${process.env.PORT}`, 'Local')
      .addServer('https://users-staging.travelzap.com', 'Staging')
      // .addServer('https://users.travelzap.com', 'Production')
      .build()
  );

  /**
   * Here we used a hacky way to wrap data object into all schema that end with 'Res'
   * Since it is the most efficient way to make all dto fit the Google JSON style response
   */
  const { schemas } = swaggerDoc.components;
  const schemaList = Object.entries(schemas);
  for (let i = 0; i < schemaList.length; i += 1) {
    const [key, value] = schemaList[i];
    if (key.match(/(.*)Res/)) {
      schemas[key] = {
        properties: { data: value },
        required: ['data'],
        type: 'object',
      };
    }
  }

  fs.writeFileSync(
    `${__filename.slice(__dirname.length + 1, -3)}.json`,
    JSON.stringify(swaggerDoc)
  );

  await app.close();
  process.exit(0);
})();
