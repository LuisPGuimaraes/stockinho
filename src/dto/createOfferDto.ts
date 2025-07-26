import {
  IsOptional,
  IsNumber,
  IsDefined,
  IsDate,
} from 'class-validator';

export class CreateOfferDto {
  @IsOptional()
  @IsNumber()
  public discountPercentage?: number;

  @IsDefined()
  @IsDate()
  public endDate: Date;
}


