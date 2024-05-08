import { registerAs } from '@nestjs/config';

export default registerAs('mysql', () => ({
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  url: process.env.MYSQL_URL,
}));
