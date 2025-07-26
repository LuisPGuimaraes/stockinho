import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { EachMessagePayload } from 'kafkajs';
import { OfferService } from 'src/@core/domain/offer.service';

const { kafka } = require('./kafka-client'); // Importa o client existente

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private consumer = kafka.consumer({
    groupId: 'sample-consumer-group',
    heartbeatInterval: 3000,
    sessionTimeout: 10000,
  });

  constructor(private offerService: OfferService) {}

  private async consumeMessage({ topic, partition, message }: EachMessagePayload): Promise<void> {
    console.log('Consuming My Message:');
    console.log({
      value: message.value?.toString(),
      topic,
      partition,
      offset: message.offset,
    });
    try {
      const parsedValue = JSON.parse(message.value?.toString() || '{}');
      const { discountPercentage, endDate } = parsedValue;
      this.offerService.create(discountPercentage, endDate);
    } catch (error) {
      console.error('Error processing message:', error);
    }

  }

  public async start(): Promise<void> {
    try {
      await this.consumer.connect();
      console.log('Kafka Consumer connected!');

      await this.consumer.subscribe({ topic: 'sample-topic', fromBeginning: true });
      console.log('Subscribed to topic: sample-topic');

      await this.consumer.run({
        autoCommit: true,
        eachMessage: this.consumeMessage.bind(this),
      });
    } catch (error) {
      console.error('Error starting Kafka consumer:', error);
      await this.consumer.disconnect();
    }
  }

  public async stop(): Promise<void> {
    try {
      await this.consumer.disconnect();
      console.log('Kafka Consumer disconnected.');
    } catch (error) {
      console.error('Error stopping Kafka consumer:', error);
    }
  }

  async onModuleInit(): Promise<void> {
    await this.start();
  }

  async onModuleDestroy(): Promise<void> {
    await this.stop();
  }
}
