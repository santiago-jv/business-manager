import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { RegisterDto } from './user.dto';
import { UserService } from './user.service';
import { ApiTags ,ApiResponse} from '@nestjs/swagger';
import { RegisterUserSpecsV1 } from './user.specs';
@ApiTags('Users')
@Controller('v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post('/register')
  @ApiResponse(RegisterUserSpecsV1.Response)
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
