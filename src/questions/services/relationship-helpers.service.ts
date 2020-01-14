import { Injectable } from '@nestjs/common';

import { Tag } from '../../tags/entities/tag.entity';

import { TagRepository } from '../../tags/repositories/tag.repository';

@Injectable()
export class RelationshipHelpersService {
  constructor(private readonly tagRepository: TagRepository) {}

  findAllTagsByIds(ids: number[]): Promise<Tag[]> {
    return this.tagRepository.findByIds(ids);
  }
}
