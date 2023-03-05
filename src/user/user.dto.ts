import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UserDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'Santiago',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'santiago@gmail.com',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'secret_password',
  })
  password: string;
}

