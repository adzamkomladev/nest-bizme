import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnswersService } from './answers.service';

import { AnswersController } from './answers.controller';

import { AnswerRepository } from './repositories/answer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerRepository])],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
