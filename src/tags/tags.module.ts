import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagsController } from './tags.controller';

import { TagsService } from './tags.service';

import { TagRepository } from './repositories/tag.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TagRepository])],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TypeOrmModule],
})
export class TagsModule {}
