import { Offer } from "src/@core/domain/offerEntity";
import { OfferRepository } from "src/@core/domain/offer.repository";
import { OfferTypeOrmRepository } from "src/@core/infra/db/offer-typeorm.repository";
import { OfferEntity } from "src/@core/infra/db/offer.entity";
import { AppDataSource } from "src/orm-config";
import { DataSource, Repository } from "typeorm";

describe('Offer TypeORM Repository', () => {
  let dataSource: DataSource;
  let offerRepository: OfferRepository;
  let ormRepo: Repository<OfferEntity>;

  beforeEach(async() => {
    dataSource = AppDataSource;

    await dataSource.initialize();
    ormRepo = dataSource.getRepository(OfferEntity);
    offerRepository = new OfferTypeOrmRepository(ormRepo);
  });

  it('should insert an offer', async () => {
      const offer = new Offer(1, 10, true, new Date(), new Date('09-20-2029'), new Date());
      
      await offerRepository.insert(offer);

      const model = await ormRepo.findOneBy({ id: offer.id });
      
      jest.spyOn(ormRepo, 'create');
      jest.spyOn(ormRepo, 'save');
      expect(model).toBeDefined();
      expect(model.id).toBe(1);
      expect(model.discountPercentage).toBe("10");
      expect(model.enabled).toBe(true);
  });
});