import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from '@nestjs/microservices';
import { Transaction } from './entities/transaction.entity';
import { User } from '../user/entities/user.entity';
import { microserviceConfig } from 'src/config/microservice.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, User]),
    ClientsModule.register(microserviceConfig),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
