import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostMailDto {
  @IsNumber()
  @IsNotEmpty()
  readonly user_id: number;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly contents: string;

  @IsNumber()
  @IsNotEmpty()
  readonly item_id: number;

  @IsNumber()
  @IsNotEmpty()
  readonly qty: number;
}
