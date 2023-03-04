import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';

export namespace CreateProductSpecsV1 {
  export const Response: ApiResponseOptions = {
    status: HttpStatus.CREATED,
    description: 'Product created',
    schema: {
      type: 'object',
      example: {
        statusCode: HttpStatus.CREATED,
        message: 'Product created',
        data: {
          product: {
            name: 'Nombre del productp',
            cost: 2000,
            price: 3500,
            quantity: 20,
            imageUrl: null,
            id: 2,
            createdAt: '2023-03-04T08:37:49.937Z',
            business: {
              id: 1,
              name: 'Negocio',
              createdAt: '2023-03-04T07:55:35.065Z',
            },
          },
        },
      },
    },
  };
}
export namespace ProductListSpecsV1 {
  export const Response: ApiResponseOptions = {
    status: HttpStatus.OK,
    description: 'Products found',
    schema: {
      type: 'object',
      example: {
        statusCode: HttpStatus.OK,
        message: 'Products found',
        data: {
          products: [
            {
              id: 1,
              name: 'Nombre del productO',
              cost: 2000,
              price: 3500,
              quantity: 20,
              imageUrl: null,
              createdAt: '2023-03-04T08:27:01.921Z',
            },
          ],
        },
      },
    },
  };
}
