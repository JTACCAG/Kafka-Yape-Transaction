import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionService } from './transaction.service';

@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @MessagePattern('antifraud')
  antifraud(@Payload() transaction): any {
    return this.transactionService.antifraud(transaction);
  }

  // @EventPattern('transaction_created')
  // antifraud(transaction) {
  //   this.transactionService.antifraud(transaction);
  // }

  // @EventPattern('antifraud.reply')
  // logReply(message): void {
  //   Logger.log(message);
  // }
}
