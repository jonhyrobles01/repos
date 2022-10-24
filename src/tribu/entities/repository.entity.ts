import { TribuEntity, MetricsEntity } from '@/tribu/entities';
import { REPOSITORY_STATE, REPOSITORY_STATUS } from '@/tribu/utils';

import {
  Column,
  Entity,
  OneToOne,
  ManyToOne,
  BaseEntity,
  JoinColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

const states = Object.keys(REPOSITORY_STATE);
const status = Object.keys(REPOSITORY_STATUS);

@Entity({ name: 'repository' })
export class RepositoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_repository: number;

  @Column('int')
  id_tribe: number;

  @Column({ type: 'char', length: 50 })
  name: string;

  @Column({
    type: 'char',
    length: 1,
    enum: [...states],
    default: states[0],
  })
  state: string;

  @CreateDateColumn()
  create_time: Date;

  @Column({ type: 'char', length: 1, enum: [...status], default: status[0] })
  status: number;

  @JoinColumn({
    name: 'id_tribe',
    referencedColumnName: 'id_tribe',
  })
  @ManyToOne(() => TribuEntity, ({ repositories }) => repositories, {
    persistence: false,
  })
  tribe: TribuEntity;

  @JoinColumn({
    name: 'id_repository',
    referencedColumnName: 'id_repository',
  })
  @OneToOne(() => MetricsEntity, {
    eager: true,
    persistence: false,
    createForeignKeyConstraints: false,
  })
  metrics: MetricsEntity;
}
