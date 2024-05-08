import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { readdirSync } from 'fs';
import * as path from 'path';

import { Cat } from '@modules/repositories';

expand(config());

const configService = new ConfigService();

const migrationFolder = path.resolve(__dirname, 'migration-files');
const migrationFileList = readdirSync(migrationFolder).map(
  (file) => `${migrationFolder}/${file}`,
);

// use this DataSource instance only for migration:generate command cli of typeorm
export default new DataSource({
  type: 'mysql',
  url: configService.get('MYSQL_URL'),
  entities: [Cat],
  migrations: migrationFileList,
});
