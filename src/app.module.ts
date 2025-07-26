// app.module.ts
import { Module } from '@nestjs/common';
import { KafkaModule } from './modules/kafka/kafka.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './orm-config';
import { OfferModule } from './modules/offer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    OfferModule,
    KafkaModule,
  ],
})
export class AppModule {}
