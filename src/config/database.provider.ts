import {
  TypeOrmModuleOptions,
  TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const DatabaseConnectionFactory: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    const envUrl = configService.get('DATABASE_URL');
    const dbUrl = new URL(envUrl);
    const routingId = dbUrl.searchParams.get('options');
    dbUrl.searchParams.delete('options');

    return {
      type: 'cockroachdb',
      url: dbUrl.toString(),
      ssl: true,
      extra: {
        options: routingId,
      },
      entities: [],
      synchronize: true,
    };
  },
};
