import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { OfferModule } from '../offer.module';
@Module({
  imports: [OfferModule],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
