import { EntityRepository, Repository } from 'typeorm';

import { Answer } from '../entities/answer.entity';

import { AnswersFilterDto } from '../dtos/answers-filter.dto';

@EntityRepository(Answer)
export class AnswerRepository extends Repository<Answer> {
  filterAnswers(answersFilterDto: AnswersFilterDto): Promise<Answer[]> {
    const { search } = answersFilterDto;

    const query = this.createQueryBuilder('answer');

    if (search) {
      query.andWhere('answer.body LIKE :search', { search: `%${search}%` });
    }

    return query.getMany();
  }
}
