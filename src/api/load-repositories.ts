export class LoadRepositoriesApi {
  loadRepositories: () => Promise<LoadRepositoriesApi.Result>;
}

export class RepositoriesApiDto {
  id: number;
  state: string;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace LoadRepositoriesApi {
  export type Model = {
    id: number;
    state: number;
  };

  export type Result =
    | {
        repositories: RepositoriesApiDto[];
      }
    | undefined;
}
