import { Module } from '@nestjs/common';

import { RepositoryModule } from '@modules/repositories';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';

@Module({
  imports: [RepositoryModule],
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule {}
