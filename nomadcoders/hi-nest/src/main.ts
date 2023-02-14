import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // dto에 명시되지 않은 값 넣을 시 validator에 도달하지 못함
      forbidNonWhitelisted: true, // 존재해선 안되는 요소 보낼 시 request 자체를 막아버림
      transform: true,  // client에서 보낸 값을 서버가 원하는 실제 타입으로 변환
    }),
  );
  await app.listen(3000);
}
bootstrap();
