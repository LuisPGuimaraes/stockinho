import { Module } from '@nestjs/common';
import OfferCreateListener from 'src/application/offerCreateListener';
import { OfferModule } from './offer.module';
import { WORKER_LISTENERS } from 'src/@core/infra/tokens';

@Module({
  imports: [OfferModule],
  providers: [
    OfferCreateListener,
    {
      provide: WORKER_LISTENERS,
      useFactory: (
        offerCreateListener: OfferCreateListener
      ) => [offerCreateListener],
      inject: [OfferCreateListener],
    }

  ],
  exports: [OfferCreateListener],
})
export class WorkerModule {}
