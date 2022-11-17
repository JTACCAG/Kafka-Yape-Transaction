import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { v4 as uuid } from 'uuid';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          // brokers: ['kafka:29092'],
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: `user.${uuid()}`,
        },
      },
    },
  );

  await app
    .listen()
    .then(() => Logger.log('Microservice is listening'))
    .catch(() => Logger.log('Microservice is not listening'));
}
bootstrap();
