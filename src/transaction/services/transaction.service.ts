import { Injectable } from '@nestjs/common';
import { TransactionDto } from '../data-transfer-objects/transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessService } from 'src/business/services/business.service';
import { Connection } from 'typeorm';
import {
  Transaction,
  TransactionDescriptions,
  TransactionTypes,
} from '../entities/transaction.entity';
import { TransactionDetail } from '../entities/transaction-detail.entity';
import { ProductService } from 'src/product/services/product.service';
import { Business } from 'src/business/entities/business.entity';
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

  async getBusinessStatus(businessId: string) {
    const query = `
      SELECT 
        auxt.totalIncomes,
        auxt.totalExpenses,
        (auxt.totalIncomes - auxt.totalExpenses) AS "totalUtility"
        FROM 
          (
            SELECT 
            SUM(
              IF(t.type IN('INCOME','UNIT_LOAD'),t.total_amount, 0)  
            ) AS "totalIncomes",
            SUM(
              IF(t.type IN('EXPENSE','LOW_UNIT'),t.total_amount, 0)  
            ) AS "totalExpenses",
            t.id,
            t.total_amount AS "totalAmount",
            t.description,
            t.created_at AS "createdAt",
            t.type
          FROM transactions as t
          WHERE  
            t.business_id = ?
          ) AS auxt
      `;
    return this.transactionsRepository.query(query, [businessId]);
  }
  async getTransactions(businessId: string) {
    //TODO: Paginate service
    const query = `
        SELECT 
          t.id,
          t.total_amount AS "totalAmount",
          t.description,
          t.created_at AS "createdAt",
          t.type
        FROM transactions as t
        WHERE  
          t.business_id = ?
      `;
    return this.transactionsRepository.query(query, [businessId]);
  }
  async createTransaction(transactionData: TransactionDto, businessId: string) {
    const queryRunner =
      this.transactionsRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const business = await this.businessService.findOneById(businessId);

      const transaction = await this.transactionsRepository.save({
        totalAmount: transactionData.totalAmount,
        description: TransactionDescriptions[transactionData.type],
        business: business,
        type: transactionData.type,
      });

      switch (transactionData.type) {
        case 'INCOME':
          await this.createAsSale(transactionData, transaction, business);

          break;
        case 'EXPENSE':
          await this.createAsExpense(transactionData, transaction);
          break;
        case 'LOW_UNIT':
          await this.createAsLowOrLoadUnit(transactionData, transaction, 1);
          break;
        case 'UNIT_LOAD':
          await this.createAsLowOrLoadUnit(transactionData, transaction, -1);
          break;
      }

      await queryRunner.commitTransaction();
      return transaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async createAsSale(
    transactionData: TransactionDto,
    transaction: Transaction,
    business: Business,
  ): Promise<void> {
    let totalCost = 0;
    for (const transactionDetail of transactionData.transactionDetails) {
      const product = await this.productService.updateStock(
        transactionDetail.productId,
        transactionDetail.quantity,
      );

      totalCost += product.cost * transactionDetail.quantity;
      await this.transactionDetailsRepository.save({
        ...transactionDetail,
        transaction,
        product,
      });
    }
    await this.transactionsRepository.save({
      business,
      description: 'Costos de venta de productos',
      totalAmount: totalCost,
      type: TransactionTypes.EXPENSE,
    });
  }
  private async createAsExpense(
    transactionData: TransactionDto,
    transaction: Transaction,
  ): Promise<void> {
    for (const transactionDetail of transactionData.transactionDetails) {
      await this.transactionDetailsRepository.save({
        ...transactionDetail,
        transaction,
        product: null,
      });
    }
  }
  private async createAsLowOrLoadUnit(
    transactionData: TransactionDto,
    transaction: Transaction,
    switcher = 1,
  ): Promise<void> {
    for (const transactionDetail of transactionData.transactionDetails) {
      const product = await this.productService.updateStock(
        transactionDetail.productId,
        transactionDetail.quantity,
        switcher,
      );
      await this.transactionDetailsRepository.save({
        ...transactionDetail,
        transaction,
        product: product,
      });
    }
  }
}
