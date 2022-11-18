import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  names: string;

  @Column({ type: 'varchar' })
  surnames: string;

  @Column({ type: 'integer', default: 0 })
  money: number;

  @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
  updateAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'delete_at' })
  deleteAt: Date;

  @OneToMany(
    () => Transaction,
    (transaction) => transaction.accountExternalIdCredit,
  ) // note: we will create author property in the Photo class below
  transactionsCredit: Transaction[];

  @OneToMany(
    () => Transaction,
    (transaction) => transaction.accountExternalIdDebit,
  ) // note: we will create author property in the Photo class below
  transactionsDebit: Transaction[];
}
