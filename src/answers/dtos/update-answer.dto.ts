import { IsNotEmpty } from 'class-validator';

export class UpdateAnswerDto {
  @IsNotEmpty()
  readonly body: string;
}
