import { Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseRepository<Entity> {
  protected constructor(private readonly repository: Repository<Entity>) {}

  /**
   * Getter that returns typeorm repository's instance.
   */
  get instance() {
    return this.repository;
  }

  create(entity: QueryDeepPartialEntity<Entity>) {
    return this.repository
      .createQueryBuilder()
      .insert()
      .values(entity)
      .execute();
  }

  findById(id: number) {
    return this.repository.createQueryBuilder().where({ id }).getOne();
  }

  findOne(filters: QueryDeepPartialEntity<Entity>) {
    return this.repository.createQueryBuilder().where(filters).getOne();
  }

  findMany(filters: QueryDeepPartialEntity<Entity>) {
    return this.repository.createQueryBuilder().where(filters).getMany();
  }

  update(id: number, entity: QueryDeepPartialEntity<Entity>) {
    return this.repository
      .createQueryBuilder()
      .update()
      .set(entity)
      .where({ id })
      .execute();
  }

  delete(id: number) {
    return this.repository
      .createQueryBuilder()
      .delete()
      .where({ id })
      .execute();
  }
}
