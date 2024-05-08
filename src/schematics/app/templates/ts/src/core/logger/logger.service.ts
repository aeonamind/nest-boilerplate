import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as winston from 'winston';

import { commonConfig } from '@core/configs';
import {
  LoggerMessage,
  LoggerMetadata,
  LoggerTransport,
} from './logger.transport';

const levels = {
  error: 0,
  info: 1,
  warn: 2,
  debug: 3,
};

@Injectable()
export class LoggerService {
  private loggerInstance: winston.Logger;
  private serviceName: string;
  constructor(
    @Inject(commonConfig.KEY)
    private commonConf: ConfigType<typeof commonConfig>,
    private readonly loggerTransport: LoggerTransport,
  ) {
    this.serviceName = this.commonConf.serviceName;

    this.createLoggerInstance();
  }

  createLoggerInstance() {
    this.loggerInstance = winston.createLogger({
      levels: levels,
      handleExceptions: true,
      handleRejections: true,
      transports: [
        this.loggerTransport.getConsoleTransportInstance(),
        this.loggerTransport.getFileTransportInstance(),
      ],
      defaultMeta: {
        serviceName: this.serviceName,
        context: 'HTTP',
      },
    });
  }

  log(message: LoggerMessage, metadata?: LoggerMetadata) {
    this.loggerInstance.info(message as any, metadata);
  }

  error(message: LoggerMessage, metadata?: LoggerMetadata) {
    this.loggerInstance.error(message as any, metadata);
  }

  getLoggerInstance() {
    return this.loggerInstance;
  }
}
