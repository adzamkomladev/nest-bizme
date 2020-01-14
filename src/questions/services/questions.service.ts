import { Injectable, NotFoundException } from '@nestjs/common';

import { RelationshipHelpersService } from './relationship-helpers.service';

import { Question } from '../entities/question.entity';

import { QuestionRepository } from '../repositories/question.repository';

import { CreateQuestionDto } from '../dtos/create-question.dto';
import { UpdateQuestionDto } from '../dtos/update-question.dto';
import { QuestionsFilterDto } from '../dtos/questions-filter.dto';
import { FindQuestionOptionsDto } from '../dtos/find-question-options.dto';
import { BestAnswerDto } from '../dtos/best-answer.dto';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly relationshipHelpersService: RelationshipHelpersService,
  ) {}

  findAll(questionsFilterDto: QuestionsFilterDto): Promise<Question[]> {
    return this.questionRepository.filterQuestions(questionsFilterDto);
  }

  async findById(
    id: number,
    findQuestionOptionsDto: FindQuestionOptionsDto,
  ): Promise<Question> {
    try {
      const question = await this.questionRepository.findOneOrFail(id, {
        relations: ['tags', 'answers'],
      });

      const { view } = findQuestionOptionsDto;

      if (view && (view as any) === 'true') {
        await QuestionsService.view(question);
      }

      return question;
    } catch (error) {
      throw new NotFoundException(`Question with id: '${id}' not found!`);
    }
  }

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const { tagIds } = createQuestionDto;

    const tags = await this.relationshipHelpersService.findAllTagsByIds(tagIds);

    return this.questionRepository.createQuestion(createQuestionDto, tags);
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

  async setAnswerAsBest(
    id: number,
    bestAnswerDto: BestAnswerDto,
  ): Promise<void> {
    const { answerId } = bestAnswerDto;

    if (await this.relationshipHelpersService.isAnswerPresent(answerId)) {
      const question = await this.findById(id, {});

      question.bestAnswerId = answerId;

      await question.save();
    } else {
      throw new NotFoundException(`Answer with id: '${answerId} not found`);
    }
  }

  private static async view(question: Question): Promise<void> {
    question.views++;

    await question.save();
  }
}
