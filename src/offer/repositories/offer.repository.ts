import { Injectable } from '@nestjs/common';
import { OfferDto } from '../dtos/offer.dto.';

@Injectable()
export class OfferRepository {
  constructor() {}

  async saveOffers(offers: OfferDto[]) {
    console.log('Offers saved successfully', offers);
  }
}
