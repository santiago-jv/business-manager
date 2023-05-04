import { ApiProperty } from '@nestjs/swagger';
import { TransactionTypes } from '../entities/transaction.entity';

export class TransactionDetailDto {
  @ApiProperty({
    type: 'number',
    example:2000
  })
  total: number;

  @ApiProperty({
    type: 'number',
    example:10
  })
  quantity: number;

  @ApiProperty({
    type: 'string',
    example:'skskf-sdde-vbbgs-we34f'
  })
  productId?: string;

}

export class TransactionDto {
  @ApiProperty({
    type: 'number',
    example: 20000,
  })
  totalAmount: number;

  @ApiProperty({
    type: 'string',
    example:TransactionTypes.INCOME,
  })
  type: TransactionTypes;

  @ApiProperty({
    type: [TransactionDetailDto],
  })
  transactionDetails: TransactionDetailDto[];

}
