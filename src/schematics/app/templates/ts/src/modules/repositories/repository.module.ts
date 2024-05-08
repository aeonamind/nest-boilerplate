import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cat } from './entities';
import { CatRepository } from './cat.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
  providers: [CatRepository],
  exports: [CatRepository],
})
export class RepositoryModule {}
