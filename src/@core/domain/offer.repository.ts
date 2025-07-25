import { Offer } from "./offer.entity";

export interface OfferRepository {
    insert(offer: Offer): Promise<void>;
}