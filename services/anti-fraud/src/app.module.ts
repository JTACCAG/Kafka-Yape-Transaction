import { Module } from '@nestjs/common';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [TransactionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
