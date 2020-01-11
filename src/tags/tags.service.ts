import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { Tag } from './entities/tag.entity';

import { TagRepository } from './repositories/tag.repository';

import { TagsFilterDto } from './dtos/tags-filter.dto';
import { CreateTagDto } from './dtos/create-tag.dto';
import { UpdateTagDto } from './dtos/update-tag.dto';

@Injectable()
export class TagsService {
  private logger: Logger;

  constructor(private readonly tagRepository: TagRepository) {
    this.logger = new Logger('TagsService');
  }

  async findAll(tagsFilterDto: TagsFilterDto): Promise<Tag[]> {
    const tags = await this.tagRepository.filterQuestions(tagsFilterDto);

    this.logger.log({ tags });

    return tags;
  }

  async findById(id: number): Promise<Tag> {
    try {
      const tag = await this.tagRepository.findOneOrFail(id);

      this.logger.log({ tag });

      return tag;
    } catch (error) {
      throw new NotFoundException(`Tag with id: '${id}' not found!`);
    }
  }

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const tag = await this.tagRepository.save(createTagDto);

    this.logger.log({ tag });

    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto): Promise<void> {
    const result = await this.tagRepository.update(id, updateTagDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Tag with id: '${id}' not found!`);
    }

    this.logger.verbose(
      `update(${id}, ${JSON.stringify(updateTagDto)}) has update successfully`,
    );
  }

  async delete(id: number): Promise<void> {
    const result = await this.tagRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Tag with id: '${id}' not found!`);
    }

    this.logger.verbose(`delete(${id}) has deleted successfully`);
  }
}
