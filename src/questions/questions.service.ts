import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { QuestionRepository } from './repositories/question.repository';

import { Question } from './entities/question.entity';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { UpdateQuestionDto } from './dtos/update-question.dto';
import { QuestionsFilterDto } from './dtos/questions-filter.dto';

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

  async findById(id: number): Promise<Question> {
    try {
      const question = await this.questionRepository.findOneOrFail(id);

      this.logger.verbose(
        `findById() returned this question: ${JSON.stringify(question)}.`,
      );

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
  ): Promise<Question> {
    const question = await this.findById(id);

    this.logger.verbose(
      `This is data to be used to update question: ${JSON.stringify(
        updateQuestionDto,
      )}.`,
    );

    const { title, body } = updateQuestionDto;

    question.title = title ?? question.title;
    question.body = body ?? question.body;

    const saved = await question.save();

    this.logger.verbose(`update() returned this: ${JSON.stringify(saved)}.`);

    return saved;
  }

  async delete(id: number): Promise<void> {
    const result = await this.questionRepository.delete(id);

    this.logger.verbose(
      `delete(${id}) returned this: ${JSON.stringify(result)}.`,
    );
  }

  async view(id: number): Promise<void> {
    const question = await this.findById(id);

    question.views++;

    await question.save();

    this.logger.verbose(
      `view(${id}) changed to this: ${JSON.stringify(question)}.`,
    );
  }
}
