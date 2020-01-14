import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly body: string;

  @IsNotEmpty()
  @IsArray()
  readonly tagIds: number[];
}
