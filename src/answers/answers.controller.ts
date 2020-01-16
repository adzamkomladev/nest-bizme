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

import { AnswersService } from './answers.service';

import { Answer } from './entities/answer.entity';

import { AnswersFilterDto } from './dtos/answers-filter.dto';
import { UpdateAnswerDto } from './dtos/update-answer.dto';
import { CreateAnswerDto } from './dtos/create-answer.dto';

@Controller('answers')
@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }),
)
@UseGuards(AuthGuard('jwt'))
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Get()
  findAll(@Query() answersFilterDto: AnswersFilterDto): Promise<Answer[]> {
    return this.answersService.findAll(answersFilterDto);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Answer> {
    return this.answersService.findById(id);
  }

  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto): Promise<Answer> {
    return this.answersService.create(createAnswerDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAnswerDto: UpdateAnswerDto,
  ): Promise<void> {
    return this.answersService.update(id, updateAnswerDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.answersService.delete(id);
  }
}
