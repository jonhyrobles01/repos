import { Column, Entity, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity({ name: 'metrics' })
export class MetricsEntity extends BaseEntity {
  @PrimaryColumn()
  id_repository: number;

  @Column('float')
  coverage: number;

  @Column({ type: 'int', default: 0 })
  bugs: number;

  @Column({ type: 'int', default: 0 })
  vulnerabilities: number;

  @Column({ type: 'int', default: 0 })
  hotspot: number;

  @Column({ type: 'int', default: 0 })
  code_smells: number;
}
