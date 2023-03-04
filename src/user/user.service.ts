import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterDto, UserDto } from './user.dto';
import { BusinessService } from 'src/business/business.service';

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
      const user = await this.usersRepository.save(registerData.user);
      const business = await this.businessService.createBusiness({
        ...registerData.business,
      });
      user.business = business;
      this.usersRepository.save(user);

      return { ...user, business };
    } catch (error) {
      console.error('There was an error in: UserService::createUser', error);
      throw new BadRequestException('There was an error trying create user');
    }
  }
}
