import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { QuestionRepository } from './repositories/question.repository';

import { Question } from './entities/question.entity';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { UpdateQuestionDto } from './dtos/update-question.dto';
import { QuestionsFilterDto } from './dtos/questions-filter.dto';
import { FindQuestionOptionsDto } from './dtos/find-question-options.dto';

@Injectable()
export class QuestionsService {
  private logger: Logger;

  constructor(private readonly questionRepository: QuestionRepository) {
    this.logger = new Logger('QuestionsService');
  }

  async findAll(questionsFilterDto: QuestionsFilterDto): Promise<Question[]> {
    const questions = await this.questionRepository.filterQuestions(
      questionsFilterDto,
    );

    this.logger.verbose(
      `findAll() with parameter: '${JSON.stringify(
        questionsFilterDto,
      )}' returned these questions: ${JSON.stringify(questions)}.`,
    );

    return questions;
  }

  async findById(
    id: number,
    findQuestionOptionsDto: FindQuestionOptionsDto,
  ): Promise<Question> {
    try {
      const question = await this.questionRepository.findOneOrFail(id);

      this.logger.verbose(
        `findById(${id}, ${JSON.stringify(
          findQuestionOptionsDto,
        )}) returned this question: ${JSON.stringify(question)}.`,
      );

      const { view } = findQuestionOptionsDto;

      this.logger.log({ view });

      if (view && (view as any) === 'true') {
        await this.view(question);
      }

      return question;
    } catch (error) {
      throw new NotFoundException(`Question with id: '${id}' not found!`);
    }
  }

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    this.logger.verbose(
      `This is data to be used to create a question: ${JSON.stringify(
        createQuestionDto,
      )}.`,
    );

    const question = await this.questionRepository.createQuestion(
      createQuestionDto,
    );

    this.logger.verbose(`create() returned this: ${JSON.stringify(question)}.`);
    return question;
  }

  async update(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<void> {
    const result = await this.questionRepository.update(id, updateQuestionDto);

    this.logger.verbose(
      `update(${id}, ${JSON.stringify(
        updateQuestionDto,
      )}) returned this: ${JSON.stringify(result)}.`,
    );

    if (result.affected === 0) {
      throw new NotFoundException(`Question with id: '${id}' not found!`);
    }
  }

  async delete(id: number): Promise<void> {
    const result = await this.questionRepository.delete(id);

    this.logger.verbose(
      `delete(${id}) returned this: ${JSON.stringify(result)}.`,
    );

    if (result.affected === 0) {
      throw new NotFoundException(`Question with id: '${id}' not found!`);
    }
  }

  private async view(question: Question): Promise<void> {
    question.views++;

    await question.save();

    this.logger.verbose(`views of question has been incremented`);
  }
}
