import { ConfigService } from '@nestjs/config';
import { HttpModuleAsyncOptions, HttpModuleOptions } from '@nestjs/axios';

export const AxiosFactory: HttpModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService): HttpModuleOptions => {
    const initAxios = { baseURL: configService.get('MOCK_URL') };

    return { ...initAxios };
  },
};
