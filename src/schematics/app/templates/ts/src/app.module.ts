import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';

import { CustomConfigModule } from '@core/configs';
import { DatabaseModule } from '@core/database';
import { LoggerModule, LoggerInterceptor } from '@core/logger';
import { AllExceptionsFilter, TypeormExceptionFilter } from '@core/filters';
import {
  CustomClassSerializerInterceptor,
  ResponseInterceptor,
} from '@core/interceptors';
import { AsyncContextModule } from '@core/async-context';
import { SecurityMiddleware } from '@core/middlewares';
import { CatModule } from '@modules/cat';
import { AppController } from './app.controller';
import { routes } from './app.route';

const modules = [
  RouterModule.register(routes),
  CustomConfigModule,
  AsyncContextModule,
  LoggerModule,
  DatabaseModule,
  CatModule,
];

const providers = [
  {
    provide: APP_INTERCEPTOR,
    useClass: LoggerInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: CustomClassSerializerInterceptor,
  },
  {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  },
  {
    provide: APP_FILTER,
    useClass: TypeormExceptionFilter,
  },
];

@Module({
  imports: [...modules],
  controllers: [AppController],
  providers: [...providers],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SecurityMiddleware).forRoutes('*');
  }
}
