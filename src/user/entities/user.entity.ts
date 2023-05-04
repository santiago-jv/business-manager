import { Exclude } from 'class-transformer';
import { Business } from 'src/business/entities/business.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn({name:'created_at'})
  createdAt: Date;

  @OneToOne(() => Business, (business) => business.user)
  business: Business;
}
