import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './modules/kafka/kafka.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './orm-config';

@Module({
  imports: [KafkaModule, TypeOrmModule.forRoot(ormConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
