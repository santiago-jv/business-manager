import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TransactionDto } from '../data-transfer-objects/transaction.dto';
import { TransactionService } from '../services/transaction.service';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import {
  GetBusinessStatusV1,
  GetTransactionsSpecsV1,
} from '../specifications/transaction.specs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthRequest } from 'src/auth/interfaces/jwt-payload.interface';
import { TransactionResponse } from '../responses/transaction.response';

@ApiTags('Transactions')
@Controller('v1/transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Post('')
  @ApiBody({ type: TransactionDto })
  @ApiCreatedResponse({type:TransactionResponse})
  async createTransaction(
    @Body() transactionSaleData: TransactionDto,
    @Request() request: AuthRequest,
  ) {
    const transaction = await this.transactionService.createTransaction(
      transactionSaleData,
      request.user.businessId,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Transaction created',
      data: {
        transaction,
      },
    };
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Get('')
  @ApiResponse(GetTransactionsSpecsV1.Response)
  async getTransactions(@Request() request: AuthRequest) {
    const transactions = await this.transactionService.getTransactions(
      request.user.businessId,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Transactions found',
      data: {
        transactions,
      },
    };
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Get('/business-status')
  @ApiResponse(GetBusinessStatusV1.Response)
  async getBusinessStatus(@Request() request: AuthRequest) {
    const businessStatus = await this.transactionService.getBusinessStatus(
      request.user.businessId,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Business status found',
      data: {
        businessStatus,
      },
    };
  }
}
