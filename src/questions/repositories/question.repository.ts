import { EntityRepository, Repository } from 'typeorm';

import { Question } from '../entities/question.entity';
import { Tag } from '../../tags/entities/tag.entity';

import { CreateQuestionDto } from '../dtos/create-question.dto';
import { QuestionsFilterDto } from '../dtos/questions-filter.dto';

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {
  filterQuestions(questionsFilterDto: QuestionsFilterDto): Promise<Question[]> {
    const { search } = questionsFilterDto;

    const query = this.createQueryBuilder('question');

    if (search) {
      query.andWhere(
        'question.title LIKE :search OR question.body LIKE :search',
        { search: `%${search}%` },
      );
    }

    return query.getMany();
  }

  createQuestion(
    createQuestionDto: CreateQuestionDto,
    tags: Tag[],
  ): Promise<Question> {
    const { title, body } = createQuestionDto;

    const question = this.create();
    question.title = title;
    question.body = body;
    question.tags = tags;

    return question.save();
  }
}
