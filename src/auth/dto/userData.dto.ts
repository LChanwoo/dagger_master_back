import { IsEmail, IsEmpty, IsNumber, IsString } from 'class-validator';

export class UserDataDto {
  @IsNumber()
  user_id!: number;

  @IsEmail()
  email!: string;

  @IsString()
  nickname!: string;
}
