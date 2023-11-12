import { IsBoolean, IsNumber, IsString, ValidateNested } from 'class-validator';
import { IDtoMapper } from '../interfaces/dto-mapper.interface';
import { OfferDto } from '../../offer/dtos/offer.dto.';
import { Type } from 'class-transformer';

class Provider2DataOffer {
  @IsNumber()
  campaign_id: number;

  @IsString()
  icon: string;

  @IsString()
  name: string;

  @IsString()
  tracking_url: string;

  @IsString()
  instructions: string;

  @IsString()
  description: string;
}

class Provider2DataOs {
  @IsBoolean()
  android: boolean;

  @IsBoolean()
  ios: boolean;

  @IsBoolean()
  web: boolean;
}

class Provider2Data {
  @ValidateNested()
  @Type(() => Provider2DataOffer)
  Offer: Provider2DataOffer;

  @ValidateNested()
  @Type(() => Provider2DataOs)
  OS: Provider2DataOs;
}

export class Provider2Dto implements IDtoMapper {
  @ValidateNested({ each: true })
  @Type(() => Provider2Data)
  data: Map<string, Provider2Data>;

  mapToOffer(): OfferDto[] {
    const providerName = 'provider2';
    return Array.from(this.data.values()).map((value) => ({
      externalOfferId: value.Offer.campaign_id.toString(),
      thumbnail: value.Offer.icon,
      name: value.Offer.name,
      offerUrlTemplate: value.Offer.tracking_url,
      description: value.Offer.description,
      requirements: value.Offer.instructions,
      isDesktop: value.OS.web ? 1 : 0,
      isAndroid: value.OS.android ? 1 : 0,
      isIos: value.OS.ios ? 1 : 0,
      providerName,
      slug: `${providerName}-${value.Offer.campaign_id}`,
    }));
  }
}
