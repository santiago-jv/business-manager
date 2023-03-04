import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class BusinessDto {
    @IsNotEmpty()
    @ApiProperty({
        example:'Name of your business'
    })
    name:string;
}