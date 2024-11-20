import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as process from 'node:process';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.listen(PORT, "0.0.0.0",() => console.log(`Listening on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

bootstrap();
