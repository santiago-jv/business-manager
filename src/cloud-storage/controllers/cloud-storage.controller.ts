import {
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../services/cloudinary.service';
import { UploadFileWithCloudinary } from '../specifications/cloudinary.doc';

@ApiTags('Cloud Storages')
@Controller('v1/cloud-storage')
export class CloudStorageV1Controller {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Post('/cloudinary')
  @ApiConsumes('multipart/form-data')
  @ApiBody(UploadFileWithCloudinary.RequestBodySpecs)
  @ApiResponse(UploadFileWithCloudinary.ResponseSpecs)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileToCloudinary(@UploadedFile() file: Express.Multer.File) {
    const url = await this.cloudinaryService.uploadFile(file);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'File uploaded',
      data: { url: url },
    };
  }
}
