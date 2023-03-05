import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { TransactionSaleDto } from './transaction.dto';
import { TransactionService } from './transaction.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateSaleSpecsV1 } from './transaction.specs';

@ApiTags('Transactions')
@Controller('v1/transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('sale')
  @ApiResponse(CreateSaleSpecsV1.Response)
  async createSale(@Body() transactionSaleData: TransactionSaleDto) {
    const transaction = await this.transactionService.createSale(
      transactionSaleData,
      '9b83514c-7446-4cf6-b59e-233e04cd19e9',
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Sale created',
      data: {
        transaction,
      },
    };
  }
}
