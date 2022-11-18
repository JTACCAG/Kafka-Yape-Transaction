import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { map, Observable, timeout, toArray } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { RetrieveTransactionDto } from './dto/retrieve-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransactionStatus } from './entities/transaction.entity';

@Injectable()
export class TransactionService implements OnModuleInit {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject('ANTIFRAUD')
    private readonly clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.clientKafka.subscribeToResponseOf('antifraud');
    await this.clientKafka.connect();
  }

  async create(createTransactionDto: CreateTransactionDto) {
    const accountExternalIdDebit = await this.userRepository.findOne({
      where: { id: createTransactionDto.accountExternalIdDebit },
    });
    const accountExternalIdCredit = await this.userRepository.findOne({
      where: { id: createTransactionDto.accountExternalIdCredit },
    });
    const newTransaction = await this.transactionRepository.save({
      accountExternalIdDebit: accountExternalIdDebit,
      accountExternalIdCredit: accountExternalIdCredit,
      type: createTransactionDto.tranferTypeId,
      value: createTransactionDto.value,
    });
    this.clientKafka
      .send('antifraud', { value: newTransaction })
      // .subscribe((resp) => {
      //   console.log(resp);
      //   return resp;
      // })
      .subscribe(async (resp) => {
        const retrieveTransactionDto = new RetrieveTransactionDto(
          resp.transactionId,
          1,
          resp.response
            ? TransactionStatus.APPROVED
            : TransactionStatus.REJECTED,
          +resp.value,
          resp.receivedAt,
        );
        await this.updateStatus(retrieveTransactionDto);
      });
    return newTransaction;
  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  async updateStatus(retrieveTransactionDto: RetrieveTransactionDto) {
    const transactionExist = await this.transactionRepository.findOne({
      where: {
        id: retrieveTransactionDto.transactionExternalId,
      },
      relations: {
        accountExternalIdDebit: true,
        accountExternalIdCredit: true,
      },
    });
    // console.log(transactionExist);
    const userDebit = transactionExist.accountExternalIdDebit;
    const userCredit = transactionExist.accountExternalIdCredit;
    if (userCredit.money < retrieveTransactionDto.value)
      retrieveTransactionDto.transactionStatus = TransactionStatus.REJECTED;
    if (
      retrieveTransactionDto.transactionStatus === TransactionStatus.APPROVED
    ) {
      const updateUserCredit = Object.assign(userCredit, {
        money: userCredit.money - retrieveTransactionDto.value,
      });
      const updateUserDebit = Object.assign(userDebit, {
        money: userDebit.money + retrieveTransactionDto.value,
      });
      await this.userRepository.save(updateUserCredit);
      await this.userRepository.save(updateUserDebit);
    }
    const updateTransaction = Object.assign(
      transactionExist,
      retrieveTransactionDto,
    );
    return await this.transactionRepository.save(updateTransaction);
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
