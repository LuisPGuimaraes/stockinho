import { OfferService } from "src/@core/domain/offer.service";
import { IWorkerListener } from "./IWorkerListener";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OfferCreateListener implements IWorkerListener {
  constructor(private offerService: OfferService) {}

  async onMessage(message: Record<string, any>): Promise<void> {
    try {
      const parsedValue = JSON.parse(message.value?.toString() || '{}');
      const { discountPercentage, endDate } = parsedValue;
      this.offerService.create(discountPercentage, endDate);
    } catch (error) {
      console.error('Error processing message:', error);
    }
  }
}
export default OfferCreateListener;