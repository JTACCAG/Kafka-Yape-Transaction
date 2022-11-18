import { User } from 'src/modules/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TransactionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('transaction')
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.transactionsDebit)
  // @JoinColumn()
  accountExternalIdDebit: User;

  @ManyToOne(() => User, (user) => user.transactionsCredit)
  // @JoinColumn()
  accountExternalIdCredit: User;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  transactionStatus: string;

  @Column({ type: 'integer', default: 0 })
  transactionType: number;

  @Column({ type: 'decimal', default: 0 })
  value: number;

  @Column({ type: 'timestamp', name: 'received_at', default: null })
  receivedAt: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
  updateAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'delete_at' })
  deleteAt: Date;
}
