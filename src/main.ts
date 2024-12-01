import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const configService = new ConfigService();

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));

  const config = new DocumentBuilder()
    .setTitle('Nest Restaurant API')
    .setDescription('The Nest Restaurant API description')
    .setVersion('0.0')
    .addTag('menu, order, payment')
    .build();

    const documentFactory = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

  app.enableVersioning({
    type: VersioningType.URI
  });

  await app.listen(configService.get<number>('APP_PORT') ?? 3000, '0.0.0.0');
}
bootstrap();
