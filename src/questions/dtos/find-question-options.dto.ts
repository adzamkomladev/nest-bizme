import {IsNotEmpty, IsOptional} from 'class-validator';

export class FindQuestionOptionsDto {
  @IsOptional()
  @IsNotEmpty()
  readonly view?: boolean;
}
