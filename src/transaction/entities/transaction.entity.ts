import { Business } from 'src/business/entities/business.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { TransactionDetail } from './transaction-detail.entity';

export enum TransactionTypes {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  LOW_UNIT = 'LOW_UNIT',
  UNIT_LOAD = 'UNIT_LOAD',
}

export const TransactionDescriptions = {
  INCOME: 'Venta de productos',
  EXPENSE: 'Gasto del negocio',
  LOW_UNIT: 'Baja de unidades',
  UNIT_LOAD: 'Carga de unidades',
};

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

  @Column({
    name: 'description',
    nullable: true,
  })
  description?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  
  @ManyToOne(() => Business, (business) => business.transactions)
  @JoinColumn({ 
    name:'business_id',
  })
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
