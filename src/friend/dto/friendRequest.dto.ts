import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class FriendRequestDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @ApiProperty({
    description: '친구 요청 받는 사람의 id',
    example: 1,
    required: true,
  })
  readonly friend_id: number;
}
