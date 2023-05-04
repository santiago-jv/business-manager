import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CloudStorage } from '../interfaces/cloud-storage.interface';
import { ConfigOptions } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';
import { CloudinaryResponse } from '../interfaces/cloudinary-upload-result.interface';
import { Readable } from 'stream';
import { BASE_FOLDER } from '../constants/cloudinary.constants';

@Injectable()
export class CloudinaryService implements CloudStorage {
  private readonly cloudinary: ConfigOptions;
  constructor(private readonly configService: ConfigService) {
    const CLOUDINARY_CLOUD_NAME = this.configService.get<string>(
      'CLOUDINARY_CLOUD_NAME',
    );
    const CLOUDINARY_API_KEY =
      this.configService.get<string>('CLOUDINARY_API_KEY');
    const CLOUDINARY_API_KEY_SECRET = this.configService.get<string>(
      'CLOUDINARY_API_KEY_SECRET',
    );

    v2.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_KEY_SECRET,
    });
    this.cloudinary = v2;
  }

  public async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const stream = new Readable();
      stream.push(file.buffer);
      stream.push(null);

      const result: CloudinaryResponse = await new Promise(
        (resolve, reject) => {
          const uploadStream = this.cloudinary.uploader.upload_stream(
            { folder: BASE_FOLDER },
            (error: any, result: any) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            },
          );
          stream.pipe(uploadStream);
        },
      );
      return result.secure_url;
    } catch (error) {
      console.error(
        'There was an error trying upload file to Cloudinary',
        error,
      );
      throw new InternalServerErrorException('Error uploading file');
    }
  }
}
