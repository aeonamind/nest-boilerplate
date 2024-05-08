import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as winston from 'winston';
import * as chalk from 'chalk';
import 'winston-daily-rotate-file';
import { ClsService } from 'nestjs-cls';

import { HttpStatusCode } from '@core/constants';
import { calculateResponseTime } from '@core/utils';
import { FILE_TRANSPORT_CONFIG } from './logger.constant';

export type LoggerMessage = {
  request: Request;
  statusCode: number;
};

export type LoggerMetadata = {
  context?: string;
};

type ConsoleTransportData = {
  serviceName?: string;
  timestamp: string;
  level: string;
  message: LoggerMessage;
} & LoggerMetadata;

type FileTransportData = {
  serviceName?: string;
  message: LoggerMessage;
};

@Injectable()
export class LoggerTransport {
  private consoleTransportInstance: winston.transports.ConsoleTransportInstance;
  private fileTransportInstance;

  constructor(private readonly cls: ClsService) {
    this.createTransports();
  }
  createTransports() {
    const nestLikeColorScheme: Record<string, (text: string) => string> = {
      error: chalk.red,
      info: chalk.cyan,
      warn: chalk.yellow,
      debug: chalk.magentaBright,
      log: chalk.green,
    };

    // create console transport for logger (log to console)
    this.consoleTransportInstance = new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'MM/DD/YYYY, h:mm:ss A' }),
        winston.format.printf(
          ({
            serviceName,
            timestamp,
            level,
            message,
            context,
          }: ConsoleTransportData) => {
            const { request, statusCode } = message;

            // calculate the response time
            const responseTime = calculateResponseTime(
              this.cls.get().startAt,
              process.hrtime.bigint(),
            );

            let color = nestLikeColorScheme[level];
            if (level === 'error' && statusCode < 500)
              color = chalk.hsl(5, 80, 50); // orange color

            const formattedPid = color(
              `${('[' + serviceName + ']').padEnd(
                6,
              )} ${process.pid.toString()}  -`,
            );
            const formattedLogLevel = color(level.toUpperCase().padStart(7));
            const formattedContext = chalk.yellow(`[${context}]`);
            const formattedMethod = color(request.method.padStart(7));
            const formattedUrl = color(request.originalUrl);
            const formattedStatusCode = color(
              statusCode.toString().padStart(4),
            );
            const formattedIp = chalk.blueBright(
              `- IP: ${this.getSourceIp(request)}`,
            );
            const formattedResponseTime = responseTime
              ? chalk.yellow('+' + responseTime + 'ms')
              : '';

            return `${formattedPid} ${timestamp} ${formattedLogLevel} ${formattedContext} ${formattedMethod} ${formattedUrl} ${formattedStatusCode} ${formattedIp} ${formattedResponseTime}`;
          },
        ),
      ),
    });

    // create file transport for logger (log to file)
    this.fileTransportInstance = new winston.transports.DailyRotateFile({
      level: 'info',
      dirname: FILE_TRANSPORT_CONFIG.DIRECTORY_NAME,
      filename: FILE_TRANSPORT_CONFIG.FILE_NAME,
      auditFile: FILE_TRANSPORT_CONFIG.AUDIT_FILE,
      datePattern: FILE_TRANSPORT_CONFIG.DATE_FORMAT,
      maxSize: FILE_TRANSPORT_CONFIG.MAX_SIZE,
      maxFiles: FILE_TRANSPORT_CONFIG.MAX_FILES,
      json: true,
      format: winston.format.printf(
        ({ serviceName, message }: FileTransportData) => {
          const data = this.formatResponse(
            serviceName,
            message.request,
            message.statusCode,
          );
          return JSON.stringify(data);
        },
      ),
    });
  }

  getConsoleTransportInstance() {
    return this.consoleTransportInstance;
  }

  getFileTransportInstance() {
    return this.fileTransportInstance;
  }

  getTimestamp() {
    return new Date().toISOString().replace(/T/, ' ').slice(0, 23);
  }

  getAction = (request: Request) => {
    switch (request.method) {
      case 'GET': {
        return 'get';
      }
      case 'POST': {
        return 'add';
      }
      case 'PATCH':
      case 'PUT': {
        return 'modify';
      }
      case 'DELETE': {
        return 'delete';
      }
      default: {
        return 'unknown';
      }
    }
  };

  getActionResult = (statusCode: number): string => {
    switch (statusCode) {
      case 200:
      case 201:
      case 204: {
        return 'success';
      }
      default: {
        return `failed-${HttpStatusCode[statusCode]
          .toLowerCase()
          .replaceAll(' ', '-')}`;
      }
    }
  };

  getSourceIp = (request: Request) =>
    request.ip ||
    (request.headers['x-forwarded-for'] as string) ||
    request.socket.remoteAddress ||
    'localhost';

  formatResponse(serviceName: string, request: any, statusCode: number) {
    // get user from storage
    const user = this.cls.get().user;

    const evt_time = this.getTimestamp();
    const src_ip = this.getSourceIp(request);
    const src_username =
      user.empNo || request?.headers['x-user'] || 'unauthorized';
    const component = request.url || '';
    const action_item = component.split('?')[0].split('/').join(' ').trim();
    const action = this.getAction(request);
    const action_result = this.getActionResult(statusCode);
    const req_uri = request.originalUrl || '';
    const req_domain =
      request.headers['x-forwarded-server'] ||
      request.headers.host ||
      request.headers.origin ||
      '';
    const action_detail = {
      body: request.body,
      params: request.params,
      query: request.query,
    };

    return {
      evt_time,
      src_ip,
      src_username,
      component,
      action_item,
      action,
      action_detail,
      action_result,
      req_uri,
      req_domain,
      service_code: serviceName,
    };
  }
}
