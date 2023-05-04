import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionDetail } from '../entities/transaction-detail.entity';
import { TransactionDataResponse } from './transaction-data.response';

export class TransactionResponse {
  @ApiProperty({
    type: 'number',
    example: HttpStatus.CREATED,
  })
  statusCode: HttpStatus;

  @ApiProperty({
    type: 'string',
    example: 'Transaction created',
  })
  message: string;

  @ApiProperty({
    type: TransactionDataResponse
  })
  data: TransactionDataResponse;
}
