import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/stripe/webhook', bodyParser.raw({ type: 'application/json' }));

  app.enableCors({
    origin: ['http://localhost:8081'], // ton front
    credentials: true,
  });
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
