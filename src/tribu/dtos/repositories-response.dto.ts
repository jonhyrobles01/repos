import { REPOSITORY_STATE } from '@/tribu/utils';
import { RepositoryEntity } from '@/tribu/entities';

export class RepositoriesResponseDto {
  constructor(repo: RepositoryEntity) {
    Object.assign(this, {
      id: repo.id_repository,
      name: repo.name.trim(),
      tribe: '',
      organization: '',
      coverage: `${repo.metrics.coverage * 100}%`,
      codeSmells: +repo.metrics.code_smells,
      bugs: +repo.metrics.bugs,
      vulnerabilities: +repo.metrics.vulnerabilities,
      hotspots: +repo.metrics.hotspot,
      verificationState: '',
      state: REPOSITORY_STATE[repo.state],
    });
  }

  'id': number;
  'name': string;
  'tribe': string;
  'organization': string;
  'coverage': string;
  'codeSmells': number;
  'bugs': number;
  'vulnerabilities': number;
  'hotspots': number;
  'verificationState': string;
  'state': string;
}
