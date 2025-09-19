import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBookDto {
    @ApiProperty({example:'Shumbola'})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({example:'Said Axmad'})
    @IsString()
    @IsNotEmpty()
    author: string;

    @ApiProperty({example:1979})
    @IsNumber()
    @IsOptional()
    published_year: number;

    @ApiProperty({example: true})
    @IsBoolean()
    @IsOptional()
    available: boolean;
}
