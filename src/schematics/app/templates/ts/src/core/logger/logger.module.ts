import { Module } from '@nestjs/common';

import { LoggerService } from './logger.service';
import { LoggerInterceptor } from './logger.interceptor';
import { LoggerTransport } from './logger.transport';

@Module({
  providers: [LoggerService, LoggerInterceptor, LoggerTransport],
  exports: [LoggerService],
})
export class LoggerModule {}
