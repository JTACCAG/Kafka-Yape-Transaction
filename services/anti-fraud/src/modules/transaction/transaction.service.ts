import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
  antifraud(transaction) {
    return {
      value: {
        response:
          Math.floor(100000 + Math.random() * 900000) % 2 === 1 ? true : false,
        value: transaction.value,
        transactionId: transaction.id,
        receivedAt: new Date(),
      },
    };
  }
}
