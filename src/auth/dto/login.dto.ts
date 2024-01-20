import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    description: '이메일',
    example: '',
    required: true,
  })
  email!: string;

  @IsString()
  @ApiProperty({
    description: '비밀번호',
    example:
      '123adascwer23wecwe23rqe@!Edawsd231d@#Dwqedf32D@#dFwdfwef@#D#@G5rhtyrnghM^&J^7jh6',
    required: true,
  })
  password!: string;
}
