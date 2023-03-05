import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';

export namespace CreateSaleSpecsV1 {
  export const Response: ApiResponseOptions = {
    status: HttpStatus.CREATED,
    description: 'Sale created',
    schema: {
      type: 'object',
      example: {
        statusCode: HttpStatus.CREATED,
        message: 'Sale created',
        data: {
          transaction: {
            totalAmount: 20000,
            business: {
              id: '9b83514c-7446-4cf6-b59e-233e04cd19e9',
              name: 'Name of your business',
              createdAt: '2023-03-05T11:47:02.380Z',
            },
            transactionType: 'INCOME',
            id: 'd2bd35ac-95fe-4574-9c2c-1dbb571023ea',
            createdAt: '2023-03-05T11:49:54.626Z',
            type: 'INCOME',
          },
        },
      },
    },
  };
}
