import { registerAs } from '@nestjs/config';

export default registerAs('swagger', () => ({
  enable: process.env.SWAGGER_ENABLE === 'true',
  servers: process.env.SWAGGER_SERVER_URLS.split(','),
}));
