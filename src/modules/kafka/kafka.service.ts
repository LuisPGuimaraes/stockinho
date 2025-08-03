import { Injectable, OnModuleInit, OnModuleDestroy, Inject } from '@nestjs/common';
import { EachMessagePayload } from 'kafkajs';
import { OfferService } from 'src/@core/domain/offer.service';
import { Environment } from 'src/@core/infra/enviroment';
import { WORKER_LISTENERS } from 'src/@core/infra/tokens';
import { IWorkerListener } from 'src/application/IWorkerListener';
import OfferCreateListener from 'src/application/offerCreateListener';

const { kafka } = require('./kafka-client');
const { topics } = Environment.configuration.kafka

const eventListeners = [
  OfferCreateListener,
]

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
	constructor(@Inject(WORKER_LISTENERS) private readonly listeners: IWorkerListener[]) {}

  private consumer: any;

	
  public async start(): Promise<void> {
		
		const promises =
			this.listeners.map(async (listener: IWorkerListener) => {
			const { nameTopic, eventListener, consumerGroup } = topics[listener.constructor.name] || {};

			this.consumer = kafka.consumer({
				groupId: consumerGroup,
				heartbeatInterval: 3000,
				sessionTimeout: 10000,
			});
			await this.consumer.connect();
			console.log(`Kafka Consumer connected for ${eventListener}!`);

			try {
				await this.consumer.subscribe({ topic: nameTopic, fromBeginning: true });
				console.log(`Subscribed to topic: ${nameTopic} `);

				await this.consumer.run({
					autoCommit: true,
					eachMessage: async (payload: EachMessagePayload) => {
							await listener.onMessage(payload.message);
					}

				});
			} catch (error) {
				console.error('Error starting Kafka consumer:', error);
				await this.consumer.disconnect();
			}
		});


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
