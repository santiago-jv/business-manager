import { Module } from '@nestjs/common';
import { CloudinaryService } from './services/cloudinary.service';
import { CloudStorageV1Controller } from './controllers/cloud-storage.controller';

@Module({
  providers: [CloudinaryService],
  controllers: [CloudStorageV1Controller],
})
export class CloudStorageModule {}
