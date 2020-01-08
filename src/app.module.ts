import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { databaseConfig } from './config/database.config';

import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), QuestionsModule],
})
export class AppModule {}
