import { MockApiService } from '@/api';
import { TribuEntity } from '@/tribu/entities';
import { RepositoriesResponseDto, TribuInput } from '@/tribu/dtos';

import * as moment from 'moment';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TribuService {
  constructor(
    @InjectRepository(TribuEntity)
    private readonly tribuRepository: Repository<TribuEntity>,
    private readonly mockApiService: MockApiService,
  ) {}

  async findAll({ date, coverage, state }: TribuInput) {
    const tribusQuery = this.tribuRepository
      .createQueryBuilder('t')
      .innerJoinAndSelect('t.organization', 'o')
      .leftJoinAndSelect('t.repositories', 'r')
      .leftJoinAndSelect('r.metrics', 'm');

    if (date) {
      tribusQuery.andWhere(
        `experimental_strftime(r.create_time, 'YYYY-MM-DD') = :date`,
        {
          date: moment(date).format('YYYY-MM-DD'),
        },
      );
    }

    if (coverage) {
      tribusQuery.andWhere('m.coverage = :coverage', { coverage });
    }

    if (state) {
      tribusQuery.andWhere('r.state = :state', { state });
    }

    const tribus = await tribusQuery.getMany();
    const repositoriesApi = await this.formatMockRepositories();

    return {
      repositories: [
        ...tribus
          .map((tribu) => this.formatResponse(tribu, repositoriesApi))
          .flat(),
      ],
    };
  }

  async findOne(id: number) {
    const tribu = await this.tribuRepository
      .createQueryBuilder('t')
      .innerJoinAndSelect('t.organization', 'o')
      .leftJoinAndSelect('t.repositories', 'r')
      .leftJoinAndSelect('r.metrics', 'm')
      .where('t.id_tribe = :id', { id })
      .andWhere('r.state = :state', { state: 'E' })
      .andWhere(
        `experimental_strftime(r.create_time, 'YYYY') = experimental_strftime(NOW(), 'YYYY')`,
      )
      .getOne();

    this.validateTribu(tribu);

    const repositoriesApi = await this.formatMockRepositories();

    return { repositories: this.formatResponse(tribu, repositoriesApi) };
  }

  validateTribu(tribu: TribuEntity): void {
    if (!tribu) {
      throw new NotFoundException('La Tribu no se encuentra registrada');
    }

    if (!tribu.repositories.some((repo) => repo.metrics.coverage >= 0.75)) {
      throw new NotFoundException(
        'La Tribu no tiene repositorios que cumplan con la cobertura necesaria',
      );
    }
  }

  private formatResponse(
    tribu: TribuEntity,
    repositoriesApi: any,
  ): RepositoriesResponseDto[] {
    return tribu.repositories.map((repo) => {
      const response = new RepositoriesResponseDto(repo);
      response.tribe = tribu.name.trim();
      response.organization = tribu.organization.name.trim();
      response.verificationState = repositoriesApi[repo.id_repository];

      return response;
    });
  }

  private async formatMockRepositories(): Promise<any> {
    const { repositories } = await this.mockApiService.loadRepositories();

    return repositories.reduce((acc, repo) => {
      acc[repo.id] = repo.state;
      return acc;
    }, {});
  }
}
