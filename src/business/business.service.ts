import { BadRequestException, Injectable } from '@nestjs/common';
import { BusinessDto } from './business.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from './business.entity';
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
}
