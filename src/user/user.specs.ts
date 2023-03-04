import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';

export namespace RegisterUserSpecsV1 {
  export const Response: ApiResponseOptions = {
    status: HttpStatus.CREATED,
    description: 'User created',
    schema: {
      type: 'object',
      example: {
        statusCode: HttpStatus.CREATED,
        message: 'User created',
        data: {
          user: {
            name: 'Santiago',
            email: 'santiago@gmail.com',
            password: 'secret_password',
            id: 1,
            createdAt: '2023-03-04T07:55:35.019Z',
            business: {
              name: 'Negocio',
              id: 1,
              createdAt: '2023-03-04T07:55:35.065Z',
            },
          },
        },
      },
    },
  };
}
