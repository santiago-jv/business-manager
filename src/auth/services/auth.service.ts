import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import JwtAuthPayload from '../interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/services/user.service';
import { User } from 'src/user/entities/user.entity';
import { LoginDto, RegisterDto } from '../data-transfer-objects/auth.dto';
import { BusinessService } from 'src/business/services/business.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly businessService: BusinessService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const userFound = await this.userService.findOneByEmail(email);

    if (userFound && (await bcrypt.compare(password, userFound.password))) {
      delete userFound.password;
      return userFound;
    }
    return null;
  }

  async login(userData: LoginDto) {
    const user = await this.validateUser(userData.email, userData.password);

    if (!user) throw new UnauthorizedException('Invalid credentials');
    const business = await this.businessService.findOneByUserId(user.id);
    const payload: JwtAuthPayload = {
      id: user.id,
      businessId: business.id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      type: 'Bearer',
      user,
      business: business,
    };
  }
  public async register(userData: RegisterDto) {
    const userFound = await this.userService.findOneByEmail(
      userData.user.email,
    );
    if (userFound) throw new BadRequestException('User already exist');
    const newUser = await this.userService.createUser(userData);

    const payload: JwtAuthPayload = {
      id: newUser.id,
      businessId: newUser.business.id,
    };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
      type: 'Bearer',
      user: newUser,
    };
  }
}
