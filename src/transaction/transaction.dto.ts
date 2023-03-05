import { ApiProperty } from '@nestjs/swagger';

export class TransactionSaleDto {
  @ApiProperty({
    type: 'number',
    example: 20000,
  })
  totalAmount: number;
  @ApiProperty({
    example: [
      {
        total: 20000,
        quantity: 2,
        productId: 'dfwdfwef12Dsfdg-scvsfbvfsb-dsvsvsf',
      },
    ],
  })
  transactionDetails: TransactionDetailDto[];
}

export class TransactionDetailDto {
  total: number;
  quantity: number;
  productId: string;
}
