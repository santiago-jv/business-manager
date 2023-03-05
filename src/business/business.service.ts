import { BadRequestException, Injectable } from '@nestjs/common';
import { BusinessDto } from './business.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from './business.entity';
import { User } from 'src/user/user.entity';
@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private businessesRepository: Repository<Business>,
  ) {}
  async createBusiness(businessData: BusinessDto) {
    try {
      return this.businessesRepository.save(businessData);
    } catch (error) {
      console.error('Error in BusinessService:createBusiness', error);
      throw new BadRequestException(
        'There was an error trying create business',
      );
    }
  }
  async findOneById(businessId: string) {
    return this.businessesRepository.findOneBy({ id: businessId });
  }

  async findOneByUserId(id:string) {
    return this.businessesRepository.findOneBy({user:{id}})
  }
}
