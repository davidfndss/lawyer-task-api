import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true,      // remove propriedades não declaradas nos DTOs
    forbidNonWhitelisted: true, // lança erro se o body tiver campos não permitidos
    transform: true,      // transforma payloads em instâncias dos DTOs
  }));

  const config = new DocumentBuilder()
    .setTitle('LawyerTask API')
    .setDescription('LawyerTask API')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();