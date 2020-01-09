import { IsOptional } from 'class-validator';

export class UpdateQuestionDto {
  @IsOptional()
  readonly title?: string;

  @IsOptional()
  readonly body?: string;
}
