import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { BusinessService } from 'src/business/business.service';
import { RegisterDto } from 'src/auth/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private businessService: BusinessService,
  ) {}

  public async createUser(registerData: RegisterDto) {
    try {
      //TODO:encrypt password
      const hashedPassword = await bcrypt.hash(registerData.user.password, 10);
      registerData.user.password = hashedPassword;
      const user = await this.usersRepository.save(registerData.user);
      const business = await this.businessService.createBusiness({
        ...registerData.business,
      });
      user.business = business;
      await this.usersRepository.save(user);
      delete user.password;
      return { ...user, business };
    } catch (error) {
      console.error('There was an error in: UserService::createUser', error);
      throw new BadRequestException('There was an error trying create user');
    }
  }

  public async findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }
}
