import { Injectable, NotFoundException } from '@nestjs/common';

import { QuestionRepository } from './repositories/question.repository';

import { Question } from './entities/question.entity';

import { CreateQuestionDto } from './dtos/create-question.dto';
import { UpdateQuestionDto } from './dtos/update-question.dto';
import { QuestionsFilterDto } from './dtos/questions-filter.dto';
import { FindQuestionOptionsDto } from './dtos/find-question-options.dto';

@Injectable()
export class QuestionsService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  findAll(questionsFilterDto: QuestionsFilterDto): Promise<Question[]> {
    return this.questionRepository.filterQuestions(questionsFilterDto);
  }

  async findById(
    id: number,
    findQuestionOptionsDto: FindQuestionOptionsDto,
  ): Promise<Question> {
    try {
      const question = await this.questionRepository.findOneOrFail(id);

      const { view } = findQuestionOptionsDto;

      if (view && (view as any) === 'true') {
        await QuestionsService.view(question);
      }

      return question;
    } catch (error) {
      throw new NotFoundException(`Question with id: '${id}' not found!`);
    }
  }

  create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    return this.questionRepository.createQuestion(createQuestionDto);
  }

  async update(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<void> {
    const result = await this.questionRepository.update(id, updateQuestionDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Question with id: '${id}' not found!`);
    }
  }

  async delete(id: number): Promise<void> {
    const result = await this.questionRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Question with id: '${id}' not found!`);
    }
  }

  private static async view(question: Question): Promise<void> {
    question.views++;

    await question.save();
  }
}
