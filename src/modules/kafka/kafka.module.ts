import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { WorkerModule } from '../workerModule';
@Module({
  imports: [WorkerModule],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
