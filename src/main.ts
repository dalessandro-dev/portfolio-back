import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('1. Iniciando Bootstrap...');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  console.log('2. Nest Criado. Tentando abrir porta 3000...');

  // Força o IP 0.0.0.0 para aceitar qualquer conexão
  await app.listen(3000, '0.0.0.0');

  console.log('3. ✅ SERVIDOR ESTÁ VIVO NA PORTA 3000');
}
bootstrap();
