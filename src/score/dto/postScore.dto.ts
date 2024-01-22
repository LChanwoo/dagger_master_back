import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PostScoreDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  @ApiProperty({
    description: '게임 점수',
    example: 100,
    required: true,
  })
  score: number;
}
