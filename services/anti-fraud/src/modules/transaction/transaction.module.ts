import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { ClientsModule } from '@nestjs/microservices';
import { microserviceConfig } from 'src/config/microservice.config';

@Module({
  imports: [ClientsModule.register(microserviceConfig)],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
