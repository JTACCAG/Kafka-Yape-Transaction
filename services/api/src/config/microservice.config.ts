import { ClientsModuleOptions, Transport } from '@nestjs/microservices';
import { v4 as uuid } from 'uuid';

export const microserviceConfig: ClientsModuleOptions = [
  {
    transport: Transport.KAFKA,
    name: 'ANTIFRAUD',
    options: {
      client: {
        brokers: ['kafka:29092'],
      },
      consumer: {
        groupId: `user.${uuid()}`,
      },
    },
  },
];
