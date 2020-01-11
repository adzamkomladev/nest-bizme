import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from './config/typeorm.config';
import { QuestionsModule } from './questions/questions.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), QuestionsModule, TagsModule],
})
export class AppModule {}
