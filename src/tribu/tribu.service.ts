import { MockApiService } from '@/api';
import { TribuEntity } from '@/tribu/entities';
import { RepositoriesResponseDto } from '@/tribu/dtos';

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

  async findAll() {
    return await this.tribuRepository.find({
      relations: ['organization', 'repositories'],
    });
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

    return { repositories: await this.formatResponse(tribu) };
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

  private async formatResponse(
    tribu: TribuEntity,
  ): Promise<RepositoriesResponseDto[]> {
    const repositoriesApi = await this.formatMockRepositories();

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
