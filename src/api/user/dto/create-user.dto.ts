import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Shuxrat' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: 'shuxrat@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Shuxrat123!' })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
