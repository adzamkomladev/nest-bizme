import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as config from 'config';

const dbConfig = config.get('db');

export const databaseConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  synchronize: dbConfig.synchronize,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};
