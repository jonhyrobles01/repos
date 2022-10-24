import { OrganizationEntity } from '@/organization/entities';
import { TribuEntity, RepositoryEntity, MetricsEntity } from '@/tribu/entities';

import { Repository } from 'typeorm';
import { Seeder } from 'nestjs-seeder';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TribuSeeder implements Seeder {
  constructor(
    @InjectRepository(TribuEntity)
    private readonly tribu: Repository<TribuEntity>,
    @InjectRepository(MetricsEntity)
    private readonly metrics: Repository<MetricsEntity>,
    @InjectRepository(RepositoryEntity)
    private readonly repos: Repository<RepositoryEntity>,
    @InjectRepository(OrganizationEntity)
    private readonly organization: Repository<OrganizationEntity>,
  ) {}

  async seed(): Promise<any> {
    await this.tribu.manager.connection.synchronize(true);

    const organization1 = new OrganizationEntity();
    organization1.name = 'Banco Pichincha';
    const organization11 = await this.organization.save(organization1);

    const organization2 = new OrganizationEntity();
    organization2.name = 'Ocean';
    const organization22 = await this.organization.save(organization2);

    const organization3 = new OrganizationEntity();
    organization3.name = 'Logra';
    const organization33 = await this.organization.save(organization3);

    // ****************************
    // Tribu
    const tribu1 = new TribuEntity();
    tribu1.id_organization = organization11.id_organization;
    tribu1.name = 'Centro Digital';
    const tribu11 = await this.tribu.save(tribu1);

    const tribu2 = new TribuEntity();
    tribu2.id_organization = organization22.id_organization;
    tribu2.name = 'Centro Digital';
    const tribu22 = await this.tribu.save(tribu2);

    const tribu3 = new TribuEntity();
    tribu3.id_organization = organization33.id_organization;
    tribu3.name = 'Centro Digital';
    const tribu33 = await this.tribu.save(tribu3);

    // ****************************
    // Repositories
    const repositories1 = new RepositoryEntity();
    repositories1.id_tribe = tribu11.id_tribe;
    repositories1.name = 'cd-common-utils';
    const repositories11 = await this.repos.save(repositories1);

    const repositories2 = new RepositoryEntity();
    repositories2.id_tribe = tribu11.id_tribe;
    repositories2.name = 'cd-common-utils';
    const repositories22 = await this.repos.save(repositories2);

    const repositories3 = new RepositoryEntity();
    repositories3.id_tribe = tribu33.id_tribe;
    repositories3.name = 'cd-common-utils';
    const repositories33 = await this.repos.save(repositories3);

    //*********************** */
    // Metrics
    const metrics1 = new MetricsEntity();
    metrics1.id_repository = repositories11.id_repository;
    metrics1.coverage = 0.35;
    await this.metrics.save(metrics1);

    const metrics2 = new MetricsEntity();
    metrics2.id_repository = repositories22.id_repository;
    metrics2.coverage = 0.35;
    metrics2.code_smells = 1;
    metrics2.vulnerabilities = 2;
    await this.metrics.save(metrics2);

    const metrics3 = new MetricsEntity();
    metrics3.id_repository = repositories33.id_repository;
    metrics3.coverage = 0.15;
    metrics3.hotspot = 1;
    metrics3.code_smells = 5;
    metrics3.vulnerabilities = 3;
    metrics3.bugs = 3;
    await this.metrics.save(metrics3);

    return;
  }

  async drop(): Promise<any> {
    return;
  }
}
