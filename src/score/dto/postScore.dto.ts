import { IsNotEmpty, IsNumber } from 'class-validator';

export class PostScoreDto {
  @IsNumber()
  @IsNotEmpty()
  score: number;
}
