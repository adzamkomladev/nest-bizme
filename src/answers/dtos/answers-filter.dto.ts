import { IsNotEmpty, IsOptional } from 'class-validator';

export class AnswersFilterDto {
  @IsOptional()
  @IsNotEmpty()
  readonly search?: string;
}
