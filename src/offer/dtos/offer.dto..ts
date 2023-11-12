import { IsNumber, IsString } from 'class-validator';

export class OfferDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsString()
  requirements: string;

  @IsString()
  thumbnail: string;

  @IsNumber()
  isDesktop: 1 | 0;

  @IsNumber()
  isAndroid: 1 | 0;

  @IsNumber()
  isIos: 1 | 0;

  @IsString()
  offerUrlTemplate: string;

  @IsString()
  providerName: string;

  @IsString()
  externalOfferId: string;
}
