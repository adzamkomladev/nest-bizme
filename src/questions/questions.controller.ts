import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';

import { QuestionsService } from './services/questions.service';

import { Question } from './entities/question.entity';

import { CreateQuestionDto } from './dtos/create-question.dto';
import { UpdateQuestionDto } from './dtos/update-question.dto';
import { QuestionsFilterDto } from './dtos/questions-filter.dto';
import { FindQuestionOptionsDto } from './dtos/find-question-options.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  findAll(
    @Query(ValidationPipe) questionsFilterDto: QuestionsFilterDto,
  ): Promise<Question[]> {
    return this.questionsService.findAll(questionsFilterDto);
  }

  @Get(':id')
  findOneById(
    @Param('id', ParseIntPipe) id: number,
    @Query(ValidationPipe) findQuestionOptionsDto: FindQuestionOptionsDto,
  ): Promise<Question> {
    return this.questionsService.findById(id, findQuestionOptionsDto);
  }

  @Post()
  create(
    @Body(ValidationPipe) createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    return this.questionsService.create(createQuestionDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateQuestionDto: UpdateQuestionDto,
  ): Promise<void> {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.questionsService.delete(id);
  }
}
