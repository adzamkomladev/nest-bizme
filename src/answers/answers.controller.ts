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
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';

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
  create(
    @Body() createAnswerDto: CreateAnswerDto,
    @GetUser() user: User,
  ): Promise<Answer> {
    return this.answersService.create(createAnswerDto, user);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAnswerDto: UpdateAnswerDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.answersService.update(id, updateAnswerDto, user);
  }

  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.answersService.delete(id, user);
  }
}
