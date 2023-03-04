import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { RegisterDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/register')
  async createUser(@Body() registerData: RegisterDto) {
    const newUser = await this.userService.createUser(registerData);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created',
      data: {
        user: newUser,
      },
    };
  }
}
