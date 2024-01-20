import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PostScoreDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '게임 점수',
    example: 100,
    required: true,
  })
  score: number;
}
