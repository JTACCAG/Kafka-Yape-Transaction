import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  accountExternalIdDebit: string;

  @IsNotEmpty()
  @IsString()
  accountExternalIdCredit: string;

  @IsNotEmpty()
  @IsNumber()
  tranferTypeId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1000)
  value: number;
}
