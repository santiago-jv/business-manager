import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ProductDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'name of product',
  })
  name: string;

  @ApiProperty({
    example: 'https://....',
    required: false,
  })
  imageUrl?: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 2000,
  })
  cost: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 2500,
  })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 20,
  })
  quantity: number;
}
