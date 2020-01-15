import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from './config/typeorm.config';

import { QuestionsModule } from './questions/questions.module';
import { TagsModule } from './tags/tags.module';
import { AnswersModule } from './answers/answers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    QuestionsModule,
    TagsModule,
    AnswersModule,
    AuthModule,
  ],
})
export class AppModule {}
