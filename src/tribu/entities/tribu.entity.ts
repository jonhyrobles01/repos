import { RepositoryEntity } from '@/tribu/entities';
import { OrganizationEntity } from '@/organization/entities';

import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tribe' })
export class TribuEntity {
  @PrimaryGeneratedColumn()
  id_tribe: number;

  @Column('int')
  id_organization: number;

  @Column({ type: 'char', length: 50 })
  name: string;

  @Column('int')
  status: number;

  @JoinColumn({
    name: 'id_organization',
    referencedColumnName: 'id_organization',
  })
  @OneToOne(() => OrganizationEntity, { persistence: false })
  organization: OrganizationEntity;

  @JoinColumn({
    name: 'id_tribe',
    referencedColumnName: 'id_tribe',
  })
  @OneToMany(() => RepositoryEntity, ({ tribe }) => tribe, {
    persistence: false,
  })
  repositories: RepositoryEntity;
}
