import {
  INestApplication,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { RouteInfo } from '@nestjs/common/interfaces';

import { swaggerConfig } from '@core/configs';
import { GLOBAL_PREFIX, pathsToBeSkipped } from '@core/constants';
import { AsyncContextMiddleware } from '@core/async-context';
import { ClassValidatorException } from '@core/exception';
import { configSwagger } from './swagger.bootstrap';

const allRoutesSkippedPrefix: RouteInfo[] = pathsToBeSkipped.map((path) => ({
  path,
  method: RequestMethod.GET,
}));

export function configApp(app: INestApplication) {
  // config global prefix
  app.setGlobalPrefix(GLOBAL_PREFIX, {
    exclude: allRoutesSkippedPrefix,
  });

  // config global middlewares
  app.use(new AsyncContextMiddleware().use);

  // config global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // prevent user from passing property that is not in the dto
      stopAtFirstError: true,
      exceptionFactory(errors) {
        const firstError = errors[0];
        throw new ClassValidatorException(firstError);
      },
    }),
  );

  // config swagger
  const enableSwagger = app.get<ConfigType<typeof swaggerConfig>>(
    swaggerConfig.KEY,
  ).enable;
  if (enableSwagger) {
    configSwagger(app);
  }
}
