import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import * as config from 'config';

import { AppModule } from './app.module';

async function bootstrap() {
  const port = config.get('server.port');
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  logger.log(`App running on port ${port}`);
}
bootstrap();
