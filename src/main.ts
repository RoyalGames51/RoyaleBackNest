import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173', 'https://royalgames.me'],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
