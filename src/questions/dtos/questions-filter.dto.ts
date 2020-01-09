import { IsNotEmpty, IsOptional } from 'class-validator';

export class QuestionsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  readonly search?: string;
}
