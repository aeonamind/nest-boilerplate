import { MigrationInterface, QueryRunner } from 'typeorm';

import {
  MIGRATION_DOWN_NOT_ALLOWED,
  MIGRATION_ID_OFFSET,
} from '../migration.constant';

export class Migration1715163905247 implements MigrationInterface {
  name = 'Migration1715163905247';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`cat\` (\`n4Id\` int NOT NULL AUTO_INCREMENT, \`strName\` varchar(50) NOT NULL, \`n4Age\` int NOT NULL, \`dtCreate\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, INDEX \`cat_NC_strName\` (\`strName\`), PRIMARY KEY (\`n4Id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cat\` AUTO_INCREMENT=${MIGRATION_ID_OFFSET + 1}`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error(MIGRATION_DOWN_NOT_ALLOWED);
  }
}
