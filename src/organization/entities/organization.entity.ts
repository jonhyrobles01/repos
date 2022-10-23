import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'organization' })
export class OrganizationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_organization: number;

  @Column({ type: 'char', length: 50 })
  name: string;

  @Column('int')
  status: number;
}
