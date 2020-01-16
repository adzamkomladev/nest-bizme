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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { QuestionsService } from './services/questions.service';

import { Question } from './entities/question.entity';

import { CreateQuestionDto } from './dtos/create-question.dto';
import { UpdateQuestionDto } from './dtos/update-question.dto';
import { QuestionsFilterDto } from './dtos/questions-filter.dto';
import { FindQuestionOptionsDto } from './dtos/find-question-options.dto';
import { BestAnswerDto } from './dtos/best-answer.dto';

@Controller('questions')
@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }),
)
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  findAll(
    @Query() questionsFilterDto: QuestionsFilterDto,
  ): Promise<Question[]> {
    return this.questionsService.findAll(questionsFilterDto);
  }

  @Get(':id')
  findOneById(
    @Param('id', ParseIntPipe) id: number,
    @Query() findQuestionOptionsDto: FindQuestionOptionsDto,
  ): Promise<Question> {
    return this.questionsService.findById(id, findQuestionOptionsDto);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createQuestionDto: CreateQuestionDto): Promise<Question> {
    return this.questionsService.create(createQuestionDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Promise<void> {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.questionsService.delete(id);
  }

  @Patch(':id/best-answer')
  @UseGuards(AuthGuard('jwt'))
  makeBestAnswer(
    @Param('id', ParseIntPipe) id: number,
    @Body() bestAnswerDto: BestAnswerDto,
  ): Promise<void> {
    return this.questionsService.setAnswerAsBest(id, bestAnswerDto);
  }
}
