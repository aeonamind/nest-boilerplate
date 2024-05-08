import { registerAs } from '@nestjs/config';

export default registerAs('common', () => ({
  environment: process.env.NODE_ENV,
  port: parseInt(process.env.NODE_PORT, 10),
  serviceName: process.env.LOGGER_SERVICE_NAME || 'Nest',
  version: process.env.APP_VERSION || '0.0.1',
}));
