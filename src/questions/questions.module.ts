import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagsModule } from '../tags/tags.module';

import { QuestionsController } from './questions.controller';

import { QuestionsService } from './services/questions.service';
import { RelationshipHelpersService } from './services/relationship-helpers.service';

import { QuestionRepository } from './repositories/question.repository';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionRepository]), TagsModule],
  controllers: [QuestionsController],
  providers: [QuestionsService, RelationshipHelpersService],
})
export class QuestionsModule {}
