import { Injectable } from '@nestjs/common';
import { payload } from '../payloads/payload1';
import { OfferDto } from '../../offer/dtos/offer.dto.';
import { validateDto } from '../../core/utils/validator';
import { Provider1Dto } from '../../job/dtos/provider1.dto';
import { plainToClass } from 'class-transformer';
import { IProviderService } from '../interfaces/provider-service.interface';

@Injectable()
export class Provider1Service implements IProviderService {
  constructor() {}

  async getOffers(): Promise<OfferDto[]> {
    const rawPayload = await this.getPayload();
    const provider1Payload = plainToClass(Provider1Dto, rawPayload);

    const validationResult = await validateDto(provider1Payload);
    if (validationResult.length > 0) {
      throw new Error(validationResult.toString());
    }

    return provider1Payload.mapToOffer();
  }

  private async getPayload() {
    // TODO: get payload from external API
    return payload;
  }
}
