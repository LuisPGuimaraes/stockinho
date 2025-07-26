import { Body, Controller, Post } from "@nestjs/common";
import { OfferService } from "src/@core/domain/offer.service";
import { CreateOfferDto } from "src/dto/createOfferDto";


@Controller('offers')
export class OfferController {
  constructor(private  offerService: OfferService) {}

  @Post()
  create(@Body() createOfferDto: CreateOfferDto) {
    const { discountPercentage, endDate } = createOfferDto
    return this.offerService.create(discountPercentage, endDate);
  }
}