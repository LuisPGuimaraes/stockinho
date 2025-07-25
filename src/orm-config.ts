import { DataSource } from 'typeorm';
import { OfferEntity } from './@core/infra/db/offer.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'mini_indexer',
  synchronize: true,
  entities: [OfferEntity],
});
