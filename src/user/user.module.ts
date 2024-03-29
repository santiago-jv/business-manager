import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BusinessModule } from 'src/business/business.module';

@Module({
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User]), BusinessModule],
  exports: [UserService],
})
export class UserModule {}
