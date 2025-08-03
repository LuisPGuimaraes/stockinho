import { OfferService } from "src/@core/domain/offer.service";
import { IWorkerListener } from "./IWorkerListener";
import { Injectable } from "@nestjs/common";
import { CreateOfferMessage } from "src/@core/messageTypes/createOfferMessage";

@Injectable()
export class OfferCreateListener implements IWorkerListener {
  constructor(private offerService: OfferService) {}

  async onMessage(message: CreateOfferMessage): Promise<void> {
    const { operationId, items } = message;
    items.forEach(item => {
        try {
          item.offers.forEach(offer => {
            this.offerService.create(offer.discountPercentage, offer.start, offer.end);
          });
        } catch (error) {
          console.error('Error processing item:', error);
        }
    });
  }
}
export default OfferCreateListener;