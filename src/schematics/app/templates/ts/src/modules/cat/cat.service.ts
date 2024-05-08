import { Injectable } from '@nestjs/common';

import { PaginateParams } from '@core/types';
import { getInsertedItemId } from '@core/utils';
import { Exception } from '@core/exception';
import { CatRepository } from '@modules/repositories';
import { CreateCatDto, UpdateCatDto } from './dtos';
import { catError } from './cat.constant';

@Injectable()
export class CatService {
  constructor(private catRepository: CatRepository) {}

  async create(cat: CreateCatDto) {
    const insertResult = await this.catRepository.create(cat);

    return this.catRepository.findById(getInsertedItemId(insertResult));
  }

  async findCatList(paginateParams: PaginateParams) {
    const { page, limit } = paginateParams;
    const skip = (page - 1) * limit;
    const queryBuilder = this.catRepository.instance.createQueryBuilder();

    queryBuilder.take(limit).skip(skip);

    const [data, totalData] = await queryBuilder.getManyAndCount();

    return {
      page,
      limit,
      count: data.length,
      totalRow: totalData,
      totalPage: Math.ceil(totalData / limit),
      arr: data,
    };
  }

  async findCatById(id: number) {
    const cat = await this.catRepository.findById(id);

    if (!cat) {
      throw new Exception(catError.catNotFound);
    }

    return cat;
  }

  async update(id: number, data: UpdateCatDto) {
    const cat = await this.findCatById(id);

    if (cat.name === data.name) return this.findCatById(id);

    const isExist = await this.catRepository.findOneByName(data.name);
    if (isExist) {
      throw new Exception(catError.catNameExist);
    }

    await this.catRepository.update(id, data);
    return this.findCatById(id);
  }

  async delete(id: number) {
    await this.findCatById(id);
    await this.catRepository.delete(id);
  }
}
