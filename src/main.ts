import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

config();

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: false,
  });

  await app.listen(port);
}

bootstrap();
