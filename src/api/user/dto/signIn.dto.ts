import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'shuxrat@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Shuxrat123!' })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
