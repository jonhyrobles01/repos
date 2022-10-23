import { AppModule } from '@/app.module';

import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = app.get(ConfigService);
  const port = env.get<number>('PORT') || 8000;

  app.setGlobalPrefix('api');

  await app.listen(port, () => console.log('Server listen on port:', port));
}
bootstrap();
