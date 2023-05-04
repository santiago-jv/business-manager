import { BusinessDto } from 'src/business/data-transfer-objects/business.dto';
import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/user/data-transfer-objects/user.dto';

export class RegisterDto {
  @ApiProperty()
  user: UserDto;
  @ApiProperty()
  business: BusinessDto;
}

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    example: 'santiago@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: 'secret_password',
  })
  password: string;
}
