import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';

export namespace RegisterUserSpecsV1 {
  export const Response: ApiResponseOptions = {
    status: HttpStatus.CREATED,
    description: 'Product created',
    schema: {
      type: 'object',
      example: {
        statusCode: HttpStatus.CREATED,
        message: 'User created',
        data: {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1Mzc4MzBkLTMwZDAtNDUzMi04ZTM2LTA4MzFhOWQ4Yjg5OCIsImJ1c2luZXNzSWQiOiIzMzUzMThiZS1mNTc3LTQ3ZWMtOTFlNi02YWM1MDkzNTRhN2UiLCJpYXQiOjE2NzgwMDYwMzF9.cHmMTrqaLA-81KgjxDnZz02dI9_0D_4Rgm5lca-3mGM',
          type: 'Bearer',
          user: {
            name: 'Santiago',
            email: 'santiagoass@gmail.com',
            id: '5537830d-30d0-4532-8e36-0831a9d8b898',
            createdAt: '2023-03-05T13:47:11.645Z',
            business: {
              name: 'Name of your business',
              id: '335318be-f577-47ec-91e6-6ac509354a7e',
              createdAt: '2023-03-05T13:47:11.676Z',
            },
          },
        },
      },
    },
  };
}

export namespace LoginUserSpecsV1 {
  export const Response: ApiResponseOptions = {
    status: HttpStatus.OK,
    description: 'User logged',
    schema: {
      type: 'object',
      example: {
        statusCode: HttpStatus.OK,
        message: 'User logged',
        data: {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkwZDA2ODRlLTc3YjMtNGQ3NC05MDU4LTFjZDgxZTAyMGRkNyIsImJ1c2luZXNzSWQiOiJhZGRlOGRhYi03YmEzLTRhY2QtYjM3ZC02NmMwYmFkM2Y3YzEiLCJpYXQiOjE2NzgwMDU1OTB9.fSMfIigPVK6Q7TAGLe-qHIG4ILm_nc4VHarCg9R1IHc',
          type: 'Bearer',
          user: {
            id: '90d0684e-77b3-4d74-9058-1cd81e020dd7',
            name: 'Santiago',
            email: 'santiagojv@gmail.com',
            createdAt: '2023-03-05T13:39:36.191Z',
          },
          business: {
            id: 'adde8dab-7ba3-4acd-b37d-66c0bad3f7c1',
            name: 'Name of your business',
            createdAt: '2023-03-05T13:39:36.237Z',
          },
        },
      },
    },
  };
}
