import { IsDate, IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class RetrieveTransactionDto {
  @IsNotEmpty()
  @IsString()
  transactionExternalId: string;

  @IsNotEmpty()
  @IsString()
  transactionType: string;

  @IsNotEmpty()
  @IsDecimal()
  transactionStatus: string;

  @IsNotEmpty()
  @IsDecimal()
  value: number;

  @IsNotEmpty()
  @IsDate()
  receivedAt: Date;

  constructor(
    transactionExternalId,
    transactionType,
    transactionStatus,
    value,
    receivedAt,
  ) {
    this.transactionExternalId = transactionExternalId;
    this.transactionType = transactionType;
    this.transactionStatus = transactionStatus;
    this.value = value;
    this.receivedAt = receivedAt;
  }
}
