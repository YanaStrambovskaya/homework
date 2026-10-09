import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';

async function bootstrap() { 
  // Create an application starts from AppModule
  const app = await NestFactory.create(AppModule, { 
    instrument: ObserveInstrument,
  });
  // Next reads modules, prepares registered components and their dependencies
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
