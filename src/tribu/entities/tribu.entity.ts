import { RepositoryEntity } from '@/tribu/entities';
import { OrganizationEntity } from '@/organization/entities';

import {
  Column,
  Entity,
  OneToOne,
  OneToMany,
  BaseEntity,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tribe' })
export class TribuEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_tribe: number;

  @Column('int')
  id_organization: number;

  @Column({ type: 'char', length: 50 })
  name: string;

  @Column({ type: 'int', default: 1 })
  status: number;

  @JoinColumn({
    name: 'id_organization',
    referencedColumnName: 'id_organization',
  })
  @OneToOne(() => OrganizationEntity, {
    persistence: false,
  })
  organization: OrganizationEntity;

  @JoinColumn({
    name: 'id_tribe',
    referencedColumnName: 'id_tribe',
  })
  @OneToMany(() => RepositoryEntity, ({ tribe }) => tribe, {
    eager: true,
    nullable: true,
    persistence: false,
  })
  repositories: RepositoryEntity[];
}
