import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostNicknameDto {
  @IsString()
  @ApiProperty({
    example: 'nickname231',
    description: '유저의 닉네임',
    required: true,
  })
  nickname: string;
}
