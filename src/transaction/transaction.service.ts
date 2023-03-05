import { BadRequestException, Injectable } from '@nestjs/common';
import { TransactionSaleDto } from './transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessService } from 'src/business/business.service';
import { Transaction, TransactionTypes } from './entities/transaction.entity';
import { TransactionDetail } from './entities/transaction-detail.entity';
import { ProductService } from 'src/product/product.service';
@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
    @InjectRepository(TransactionDetail)
    private readonly transactionDetailsRepository: Repository<TransactionDetail>,
    private readonly businessService: BusinessService,
    private readonly productService: ProductService,
  ) {}
  async createSale(
    transactionSaleData: TransactionSaleDto,
    businessId: string,
  ) {
    try {
      const business = await this.businessService.findOneById(businessId);

      const transaction = await this.transactionsRepository.save({
        totalAmount: transactionSaleData.totalAmount,
        business: business,
        transactionType: TransactionTypes.INCOME,
      });

      for (const transactionDetail of transactionSaleData.transactionDetails) {
        const product = await this.productService.updateStock(
          transactionDetail.productId,
          transactionDetail.quantity,
        );
        await this.transactionDetailsRepository.save({
          ...transactionDetail,
          transaction,
          product,
        });
      }
      return transaction;
    } catch (error) {
      console.error('TransactionService::createSale', error);
      throw new BadRequestException('There was an error trying create sale');
    }
  }

  async createExpense() {}
}
