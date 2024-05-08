import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseRepository } from './base.repository';
import { Cat } from './entities';

@Injectable()
export class CatRepository extends BaseRepository<Cat> {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {
    super(catRepository);
  }

  findOneByName(name: string) {
    return this.catRepository.createQueryBuilder().where({ name }).getOne();
  }
}
