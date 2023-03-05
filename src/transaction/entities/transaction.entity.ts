import { Business } from 'src/business/business.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { TransactionDetail } from './transaction-detail.entity';
export enum TransactionTypes {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}
@Entity({
  name: 'transactions',
})
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'total_amount',
  })
  totalAmount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Business, (business) => business.transactions)
  business: Business;

  @OneToMany(
    () => TransactionDetail,
    (transactionDetail) => transactionDetail.transaction,
  )
  transactionDetails: TransactionDetail[];

  @Column({
    type: 'enum',
    enum: TransactionTypes,
    default: TransactionTypes.INCOME,
  })
  type: TransactionTypes;
}
