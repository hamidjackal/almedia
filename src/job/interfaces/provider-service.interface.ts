import { OfferDto } from 'src/offer/dtos/offer.dto.';

export interface IProviderService {
  getOffers(): Promise<OfferDto[]>;
}
