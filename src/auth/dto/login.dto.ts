import { IsEmail, IsEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsEmpty()
  password!: string;
}
