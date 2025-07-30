import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true,      // remove propriedades não declaradas nos DTOs
    forbidNonWhitelisted: true, // lança erro se o body tiver campos não permitidos
    transform: true,      // transforma payloads em instâncias dos DTOs
  }));
  await app.listen(3000);
}
bootstrap();