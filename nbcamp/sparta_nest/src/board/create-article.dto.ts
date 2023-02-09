import { IsNumber, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly content: string;

  @IsNumber()
  readonly password: number;
}