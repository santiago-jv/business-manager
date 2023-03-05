import { Business } from 'src/business/business.entity';
import { TransactionDetail } from 'src/transaction/entities/transaction-detail.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cost: number;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column({ nullable: true, name: 'image_url' })
  imageUrl?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Business, (business) => business.products)
  @JoinColumn({ name: 'business_id' })
  business: Business;

  @OneToMany(() => TransactionDetail, (transactionDetail) => transactionDetail.product)
  transactionDetails: TransactionDetail[];
}
