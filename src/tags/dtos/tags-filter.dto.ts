import { IsNotEmpty, IsOptional } from 'class-validator';

export class TagsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  readonly search?: string;
}
