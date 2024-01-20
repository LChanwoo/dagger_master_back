import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class BuyShopDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '상점 id',
    example: 1,
    required: true,
  })
  readonly shop_id: number;
}
