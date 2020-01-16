import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TagsService } from './tags.service';

import { Tag } from './entities/tag.entity';

import { TagsFilterDto } from './dtos/tags-filter.dto';
import { CreateTagDto } from './dtos/create-tag.dto';
import { UpdateTagDto } from './dtos/update-tag.dto';

@Controller('tags')
@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }),
)
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  findAll(@Query() tagsFilterDto: TagsFilterDto): Promise<Tag[]> {
    return this.tagsService.findAll(tagsFilterDto);
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number): Promise<Tag> {
    return this.tagsService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagsService.create(createTagDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<void> {
    return this.tagsService.update(id, updateTagDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tagsService.delete(id);
  }
}
