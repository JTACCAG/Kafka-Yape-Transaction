import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [UserModule, TransactionModule, ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
