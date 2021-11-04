import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

import { PORT } from './environments';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  await app.listen(PORT, '0.0.0.0');
  console.log(`🚀 Server is listening on port ${PORT}`);
}
bootstrap();
