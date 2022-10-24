import { TribuSeeder } from '@/tribu/seeders';
import { DatabaseConnectionFactory } from '@/config';
import { OrganizationEntity } from '@/organization/entities';
import { TribuEntity, RepositoryEntity, MetricsEntity } from '@/tribu/entities';

import { seeder } from 'nestjs-seeder';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

seeder({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync(DatabaseConnectionFactory),
    TypeOrmModule.forFeature([
      TribuEntity,
      MetricsEntity,
      RepositoryEntity,
      OrganizationEntity,
    ]),
  ],
}).run([TribuSeeder]);
