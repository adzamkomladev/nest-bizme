import { IsNotEmpty } from 'class-validator';

export class UpdateTagDto {
  @IsNotEmpty()
  readonly name: string;
}
