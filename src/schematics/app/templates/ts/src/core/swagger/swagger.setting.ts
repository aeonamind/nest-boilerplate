import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
const appVersion = configService.get('APP_VERSION');

export const SWAGGER_SETTINGS = {
  PREFIX: '/docs',
  TITLE: `Server API Documentation`,
  DESCRIPTION: 'API Documentation for Server',
  VERSION: appVersion || '0.0.1',
  TAGS: {
    CAT: 'Cat',
  },
} as const;
