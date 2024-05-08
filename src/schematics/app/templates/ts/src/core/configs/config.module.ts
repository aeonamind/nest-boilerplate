import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from '@core/utils';
import commonConfig from './common.config';
import swaggerConfig from './swagger.config';
import mysqlConfig from './mysql.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      load: [commonConfig, mysqlConfig, swaggerConfig],
      cache: true,
      expandVariables: true,
    }),
  ],
})
export class CustomConfigModule {}
