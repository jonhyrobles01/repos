import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'metrics' })
export class MetricsEntity {
  @PrimaryColumn()
  id_repository: number;

  @Column('float')
  coverage: number;

  @Column('int')
  bugs: number;

  @Column('int')
  vulnerabilities: number;

  @Column('int')
  hotspot: number;

  @Column('int')
  code_smells: number;
}
