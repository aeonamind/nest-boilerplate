import { INestApplication } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { SWAGGER_SETTINGS } from '@core/swagger';
import { swaggerConfig, commonConfig } from '@core/configs';
import { NodeEnv } from '@core/constants';

export function configSwagger(app: INestApplication) {
  const servers = app.get<ReturnType<typeof swaggerConfig>>(
    swaggerConfig.KEY,
  ).servers;

  const config = new DocumentBuilder()
    .setTitle(SWAGGER_SETTINGS.TITLE)
    .setDescription(SWAGGER_SETTINGS.DESCRIPTION)
    .setVersion(SWAGGER_SETTINGS.VERSION);

  servers.forEach((server: string) => config.addServer(server));

  const document = SwaggerModule.createDocument(app, config.build());

  const nodeEnv = app.get<ConfigType<typeof commonConfig>>(
    commonConfig.KEY,
  ).environment;

  const customOptions: SwaggerCustomOptions =
    nodeEnv === NodeEnv.Development
      ? {
          customSiteTitle: 'Server API',
          customfavIcon: '/images/ayaka.png',
        }
      : {
          customSiteTitle: 'Server API',
        };

  SwaggerModule.setup(SWAGGER_SETTINGS.PREFIX, app, document, customOptions);
}
