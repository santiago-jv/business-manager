import { HttpStatus } from '@nestjs/common';
import { ApiBodyOptions, ApiResponseOptions } from '@nestjs/swagger';

export namespace UploadFileWithCloudinary {
  export const RequestBodySpecs: ApiBodyOptions = {
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'file',
          format: 'binary',
        },
      },
    },
  };

  export const ResponseSpecs: ApiResponseOptions = {
    status: HttpStatus.CREATED,
    description: 'The uploaded file',
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'number',
          example: HttpStatus.CREATED,
        },
        message: {
          type: 'string',
          example: 'File uploaded',
        },
        data: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              format: 'uri',
              example:
                'https://res.cloudinary.com/dmrbxfejx/image/upload/v1683181444/uploads/hdpwz6kppdvrsetmakua.png',
            },
          },
        },
      },
    },
  };
}
