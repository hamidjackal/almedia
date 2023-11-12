import { OfferDto } from '../../offer/dtos/offer.dto.';

export interface IDtoMapper {
  mapToOffer(): OfferDto[];
}
