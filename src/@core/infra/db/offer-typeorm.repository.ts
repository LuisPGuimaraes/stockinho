import { Offer } from "src/@core/domain/offerEntity";
import { OfferRepository } from "src/@core/domain/offer.repository";
import { Repository } from "typeorm";
import { OfferEntity } from "./offer.entity";


export class OfferTypeOrmRepository implements OfferRepository {
	constructor(private ormRepo: Repository<OfferEntity>) {}

	async insert(offer: Offer): Promise<void> {
		const model = this.ormRepo.create(offer);
		await this.ormRepo.save(model);
	}
}