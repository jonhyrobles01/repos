import { CODE_VERIFICATION } from '@/api/utils';
import { LoadRepositoriesApi, RepositoriesApiDto } from '@/api';

import { lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

type Model = LoadRepositoriesApi.Model;
type Result = LoadRepositoriesApi.Result;

@Injectable()
export class MockApiService implements LoadRepositoriesApi {
  constructor(private httpService: HttpService) {}

  async loadRepositories(): Promise<Result> {
    try {
      const mockApiRepositories: Model[] = await lastValueFrom(
        this.httpService
          .get('/repositories')
          .pipe(map((response) => response.data)),
      );

      return {
        repositories: mockApiRepositories.map(
          (repository): RepositoriesApiDto => ({
            ...repository,
            state: CODE_VERIFICATION[repository.state],
          }),
        ),
      };
    } catch (error) {
      return undefined;
    }
  }
}
