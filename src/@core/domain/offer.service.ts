import { Offer } from "./offer.entity";
import { OfferRepository } from "./offer.repository";

export class OfferService {

  constructor(private offerRepository: OfferRepository) {}

  create(discountPercentage: number | null, endDate: Date): Offer {
    const offer = new Offer(discountPercentage, new Date(), endDate, new Date());
    this.offerRepository.insert(offer);

    return offer;
  }
}