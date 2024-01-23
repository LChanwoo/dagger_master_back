import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsString } from 'class-validator';

export class SuperLoginDto {
  @IsString()
  @ApiProperty({
    description: '아이디',
    example: 'superadmin',
    required: true,
  })
  address!: string;

  @IsString()
  @ApiProperty({
    description: '비밀번호',
    example: '보여줄수없어요.',
    required: true,
  })
  password!: string;
}
