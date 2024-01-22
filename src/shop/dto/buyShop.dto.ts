import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class BuyShopDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  @ApiProperty({
    description: '상점 id',
    example: 1,
    required: true,
  })
  readonly shop_id: number;
}
