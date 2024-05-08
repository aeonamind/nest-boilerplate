import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'cat',
})
export class Cat {
  @PrimaryGeneratedColumn('increment', { name: 'n4Id' })
  id: number;

  @Column({ name: 'strName', length: 50 })
  @Index('cat_NC_strName')
  name: string;

  @Column({ name: 'n4Age', type: 'int' })
  age: number;

  @CreateDateColumn({
    name: 'dtCreate',
    precision: null,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;
}
