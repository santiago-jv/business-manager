import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { BusinessModule } from './business/business.module';
import { ProductModule } from './product/product.module';
console.log(process.env.DB_HOST);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      timezone: 'America/Bogota',
      autoLoadEntities:true
    }),
    UserModule,
    BusinessModule,
    ProductModule,
    
  ],
  providers: [AppService],
})
export class AppModule {}
