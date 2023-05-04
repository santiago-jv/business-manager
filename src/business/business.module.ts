import { Module } from '@nestjs/common';
import { BusinessService } from './services/business.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';

@Module({
  providers: [BusinessService],
  imports: [TypeOrmModule.forFeature([Business])],
  exports:[BusinessService]
})
export class BusinessModule {}
