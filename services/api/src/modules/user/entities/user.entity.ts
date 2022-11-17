import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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
}
