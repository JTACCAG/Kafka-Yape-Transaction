import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { microserviceConfig } from './microservice.config';
import { typeOrmAsyncConfig } from './typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ClientsModule.register(microserviceConfig),
  ],
})
export class ConfigModule {}
