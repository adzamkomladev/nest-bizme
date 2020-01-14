import { EntityRepository, Repository } from 'typeorm';

import { Tag } from '../entities/tag.entity';

import { TagsFilterDto } from '../dtos/tags-filter.dto';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {

  filterQuestions(tagsFilterDto: TagsFilterDto): Promise<Tag[]> {
    const { search } = tagsFilterDto;

    const query = this.createQueryBuilder('tag');

    if (search) {
      query.andWhere('tag.name LIKE :search', { search: `%${search}%` });
    }

    return query.getMany();
  }
}
