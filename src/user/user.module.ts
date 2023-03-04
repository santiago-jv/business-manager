import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { BusinessModule } from 'src/business/business.module';

@Module({
  providers: [UserService],
  imports:[TypeOrmModule.forFeature([User]),BusinessModule ],
  controllers: [UserController]
})
export class UserModule {}
