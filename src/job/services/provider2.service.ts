import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Provider2Dto } from '../../job/dtos/provider2.dto';
import { payload } from '../payloads/payload2';
import { validateDto } from '../../core/utils/validator';
import { OfferDto } from '../../offer/dtos/offer.dto.';
import { IProviderService } from '../interfaces/provider-service.interface';

@Injectable()
export class Provider2Service implements IProviderService {
  constructor() {}

  async getOffers(): Promise<OfferDto[]> {
    const rawPayload = await this.getPayload();
    const provider2Payload = plainToClass(Provider2Dto, rawPayload);

    const validationResult = await validateDto(provider2Payload);
    if (validationResult.length > 0) {
      throw new Error(validationResult.toString());
    }

    return provider2Payload.mapToOffer();
  }

  private async getPayload() {
    // TODO: get payload from external API
    return payload;
  }
}
