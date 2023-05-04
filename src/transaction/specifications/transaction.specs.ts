import { HttpStatus } from '@nestjs/common';
import {
  ApiResponseOptions,
} from '@nestjs/swagger';

export namespace GetTransactionsSpecsV1 {
  export const Response: ApiResponseOptions = {
    status: HttpStatus.OK,
    description: 'Transactions found',
    schema: {
      type: 'object',
      example: {
        statusCode: HttpStatus.OK,
        message: 'Transactions found',
        data: {
          transactions: [
            {
              totalAmount: 20000,
              description: 'xsas',
              type: 'INCOME',
              id: 'd2bd35ac-95fe-4574-9c2c-1dbb571023ea',
              createdAt: '2023-03-05T11:49:54.626Z',
            },
          ],
        },
      },
    },
  };
}

export namespace GetBusinessStatusV1 {
  export const Response: ApiResponseOptions = {
    status: HttpStatus.OK,
    description: 'Business status found',
    schema: {
      type: 'object',
      example: {
        statusCode: HttpStatus.OK,
        message: 'Business status found',
        data: {
          businessStatus: {
            totalExpenses: 20000,
            totalIncomes: 50000,
            totalUtility: 30000,
          },
        },
      },
    },
  };
}
