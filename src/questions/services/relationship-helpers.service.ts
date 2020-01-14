import { Injectable } from '@nestjs/common';

import { Tag } from '../../tags/entities/tag.entity';

import { TagRepository } from '../../tags/repositories/tag.repository';
import { AnswerRepository } from '../../answers/repositories/answer.repository';

@Injectable()
export class RelationshipHelpersService {
  constructor(
    private readonly tagRepository: TagRepository,
    private readonly answerRepository: AnswerRepository,
  ) {}

  findAllTagsByIds(ids: number[]): Promise<Tag[]> {
    return this.tagRepository.findByIds(ids);
  }

  async isAnswerPresent(id: number): Promise<boolean> {
    const answer = await this.answerRepository.findOne(id);

    return answer && answer.hasId();
  }
}
