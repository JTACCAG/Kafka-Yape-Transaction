import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { from, Observable } from 'rxjs';
import { TransactionService } from './transaction.service';

@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @MessagePattern('antifraud')
  antifraud(message): Observable<number> {
    console.log(message.max);
    const numbers = [];
    for (let i = 1; i <= message.max; i++) {
      numbers.push(`i-${i}`);
    }
    console.log(numbers);
    return from(numbers);
  }

  @EventPattern('antifraud.reply')
  logReply(message): void {
    Logger.log(message);
  }
}
