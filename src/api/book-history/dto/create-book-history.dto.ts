import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateBookHistoryDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  bookId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsEnum(['BORROWED', 'RETURNED'])
  @IsOptional()
  action?: 'BORROWED' | 'RETURNED';

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  date: Date;
}
