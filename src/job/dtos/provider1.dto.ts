import { IsEnum, IsString, ValidateNested } from 'class-validator';
import { IDtoMapper } from '../interfaces/dto-mapper.interface';
import { OfferDto } from '../../offer/dtos/offer.dto.';
import { Type } from 'class-transformer';

class Provider1ResponseOffer {
  @IsString()
  offer_id: string;

  @IsString()
  offer_name: string;

  @IsString()
  offer_desc: string;

  @IsString()
  call_to_action: string;

  @IsString()
  offer_url: string;

  @IsString()
  image_url: string;

  @IsEnum(['desktop', 'mobile'])
  platform: 'desktop' | 'mobile';

  @IsString()
  device: string;
}

class Provider1Response {
  @ValidateNested({ each: true })
  @Type(() => Provider1ResponseOffer)
  offers: Provider1ResponseOffer[];
}

export class Provider1Dto implements IDtoMapper {
  @ValidateNested()
  @Type(() => Provider1Response)
  response: Provider1Response;

  mapToOffer(): OfferDto[] {
    const providerName = 'provider1';
    return this.response.offers.map((offer) => ({
      name: offer.offer_name,
      description: offer.offer_desc,
      requirements: offer.call_to_action,
      thumbnail: offer.image_url,
      isDesktop: offer.platform === 'desktop' ? 1 : 0,
      isAndroid: offer.device === 'iphone_ipad' ? 0 : 1,
      isIos: offer.device === 'iphone_ipad' ? 1 : 0,
      offerUrlTemplate: offer.offer_url,
      providerName,
      externalOfferId: offer.offer_id,
      slug: `${providerName}-${offer.offer_id}`,
    }));
  }
}
