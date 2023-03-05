import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TransactionSaleDto } from './transaction.dto';
import { TransactionService } from './transaction.service';
import { ApiTags, ApiResponse,ApiBearerAuth } from '@nestjs/swagger';
import { CreateSaleSpecsV1 } from './transaction.specs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthRequest } from 'src/auth/interfaces/jwt-payload.interface';

@ApiTags('Transactions')
@Controller('v1/transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Post('sale')
  @ApiResponse(CreateSaleSpecsV1.Response)
  async createSale(
    @Body() transactionSaleData: TransactionSaleDto,
    @Request() request: AuthRequest,
  ) {
    const transaction = await this.transactionService.createSale(
      transactionSaleData,
      request.user.businessId,
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
