import { IsNotEmpty, IsNumber } from 'class-validator';

export class BestAnswerDto {
  @IsNotEmpty()
  @IsNumber()
  readonly answerId: number;
}
