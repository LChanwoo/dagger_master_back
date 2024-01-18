import { IsEmail, IsEmpty, IsNumber, IsString } from 'class-validator';

export class UserDataDto {
  @IsNumber()
  USER_ID!: number;

  @IsEmail()
  EMAIL!: string;

  @IsString()
  NICKNAME!: string;

  @IsEmpty()
  SUB_ID!: string;

  @IsEmpty()
  CREATE_DATE!: string;
}
