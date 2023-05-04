import { Product } from 'src/product/entities/product.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  JoinColumn,
  OneToMany
} from 'typeorm';

@Entity({
  name: 'businesses',
})
export class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({name:'created_at'})
  createdAt: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Product, product => product.business)
  products: Product[];

  @OneToMany(() => Transaction, (transaction) => transaction.business)
  transactions: Transaction[];
}
