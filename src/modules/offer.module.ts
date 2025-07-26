import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { OfferService } from 'src/@core/domain/offer.service';
import { OfferTypeOrmRepository } from 'src/@core/infra/db/offer-typeorm.repository';
import { OfferEntity } from 'src/@core/infra/db/offer.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OfferEntity])],
  providers: [
    {
      provide: OfferTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new OfferTypeOrmRepository(dataSource.getRepository(OfferEntity));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: OfferService,
      useFactory: (offerRepository: OfferTypeOrmRepository) => {
        return new OfferService(offerRepository);
      },
      inject: [OfferTypeOrmRepository],
    },
  ],
  exports: [OfferService]
})
export class OfferModule {}
