import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags ,ApiResponse} from '@nestjs/swagger';
import { LoginUserSpecsV1, RegisterUserSpecsV1 } from './auth.specs';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto, RegisterDto } from './auth.dto';

@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('/register')
  @ApiResponse(RegisterUserSpecsV1.Response)
  async createUser(@Body() registerData: RegisterDto) {
    const data = await this.authService.register(registerData);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created',
      data: data
    };
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse(LoginUserSpecsV1.Response)
  async loginUser(@Body() loginData: LoginDto) {
    const data = await this.authService.login(loginData);
    return {
      statusCode: HttpStatus.OK,
      message: 'User logged',
      data: data
    };
  }
}
