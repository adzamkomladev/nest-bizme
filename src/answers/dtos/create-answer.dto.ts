import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAnswerDto {
  @IsNotEmpty()
  @IsNumber()
  readonly questionId: number;

  @IsNotEmpty()
  readonly body: string;
}
