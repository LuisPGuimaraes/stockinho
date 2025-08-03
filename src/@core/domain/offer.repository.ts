import { Offer } from "./offerEntity";

export interface OfferRepository {
    insert(offer: Offer): Promise<void>;
}