import { Business } from 'src/business/business.entity';
import { Product } from 'src/product/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity({
  name: 'transaction_details',
})
export class TransactionDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column()
  total: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Product, (product) => product.transactionDetails)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Transaction, (transaction) => transaction.transactionDetails)
  @JoinColumn({ name: 'transaction_id' })
  transaction: Transaction;
}
