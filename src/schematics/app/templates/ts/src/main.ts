import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { useContainer } from 'class-validator';

import { commonConfig } from '@core/configs';
import { configApp } from '@core/bootstrap';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // for using custom class-validator decorator with dependency injection
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useStaticAssets(join(__dirname, 'static'));

  configApp(app);

  const appConfig = app.get<ConfigType<typeof commonConfig>>(commonConfig.KEY);
  await app.listen(appConfig.port);

  const logger = new Logger('Bootstrap');
  logger.verbose(
    `Server [${appConfig.version}] is listening at port: ${appConfig.port}`,
  );
}

bootstrap();
