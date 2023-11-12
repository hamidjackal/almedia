import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  app.enableCors();

  await app.listen(PORT);
  logger.log(`Server is running on: ${PORT}`);
}
bootstrap();
