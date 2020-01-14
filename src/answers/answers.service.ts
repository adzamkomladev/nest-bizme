import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { Answer } from './entities/answer.entity';

import { AnswerRepository } from './repositories/answer.repository';

import { AnswersFilterDto } from './dtos/answers-filter.dto';
import { CreateAnswerDto } from './dtos/create-answer.dto';
import { UpdateAnswerDto } from './dtos/update-answer.dto';

@Injectable()
export class AnswersService {
  private logger: Logger;
  constructor(private readonly answerRepository: AnswerRepository) {
    this.logger = new Logger('AnswersService');
  }

  async findAll(answersFilterDto: AnswersFilterDto): Promise<Answer[]> {
    const answers = await this.answerRepository.filterAnswers(answersFilterDto);

    this.logger.verbose(`Answers filtered: ${answers}`);

    return answers;
  }

  async findById(id: number): Promise<Answer> {
    try {
      const answer = await this.answerRepository.findOneOrFail(id);

      this.logger.verbose(`Answer returned: ${JSON.stringify(answer)}`);

      return answer;
    } catch (error) {
      throw new NotFoundException(`Answer with id: '${id}' not found!`);
    }
  }

  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const answer = await this.answerRepository.save(createAnswerDto);

    this.logger.log({ answer });

    return answer;
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<void> {
    const result = await this.answerRepository.update(id, updateAnswerDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Answer with id: '${id}' not found!`);
    }

    this.logger.verbose(
      `update(${id}, ${JSON.stringify(
        updateAnswerDto,
      )}) has update successfully`,
    );
  }

  async delete(id: number): Promise<void> {
    const result = await this.answerRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Answer with id: '${id}' not found!`);
    }

    this.logger.verbose(`delete(${id}) has deleted successfully`);
  }
}
