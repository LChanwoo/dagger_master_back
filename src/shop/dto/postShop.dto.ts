import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostShopDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @ApiProperty({
    description: '아이템 id',
    example: 1,
    required: true,
  })
  readonly item_id: number;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @ApiProperty({
    description: '아이템 가격',
    example: 10000,
    required: true,
  })
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '상점 시작 날짜',
    example: '2024-01-01',
    required: true,
  })
  readonly start_date: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '상점 종료 날짜',
    example: '2025-01-01',
    required: true,
  })
  readonly end_date: string;
}
