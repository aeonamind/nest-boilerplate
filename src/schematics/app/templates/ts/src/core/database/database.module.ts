import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { mysqlConfig } from '@core/configs';
import { Cat } from '@modules/repositories';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (mysqlConf: ConfigType<typeof mysqlConfig>) => ({
        type: 'mysql',
        url: mysqlConf.url,
        entities: [Cat],
      }),
      inject: [mysqlConfig.KEY],
    }),
  ],
})
export class DatabaseModule {}
