import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Order from './Order';

@Entity('customers')
class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  address: string;

  @Column()
  number: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  cep: string;

  @Column()
  state: string;

  @OneToMany(() => Order, order => order.customer)
  orders: Order[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Customer;
