import 'reflect-metadata';
import { Provider1Dto } from './provider1.dto';
import { plainToInstance } from 'class-transformer';

describe('Provider1Dto', () => {
  it('should be defined', () => {
    const provider1Dto = new Provider1Dto();
    expect(provider1Dto).toBeDefined();
  });

  it('should map to offer', () => {
    const data = {
      response: {
        offers: [
          {
            offer_id: '1',
            offer_name: 'offer_name',
            offer_desc: 'offer_desc',
            call_to_action: 'call_to_action',
            offer_url: 'offer_url',
            image_url: 'image_url',
            platform: 'desktop',
            device: 'iphone_ipad',
          },
        ],
      },
    };
    const provider1Dto = plainToInstance(Provider1Dto, data);
    const offer = provider1Dto.mapToOffer();

    expect(offer).toBeDefined();
    expect(offer.length).toBe(1);
    expect(offer[0].externalOfferId).toBe('1');
    expect(offer[0].thumbnail).toBe('image_url');
    expect(offer[0].name).toBe('offer_name');
    expect(offer[0].offerUrlTemplate).toBe('offer_url');
    expect(offer[0].description).toBe('offer_desc');
    expect(offer[0].requirements).toBe('call_to_action');
    expect(offer[0].isDesktop).toBe(1);
    expect(offer[0].isAndroid).toBe(0);
    expect(offer[0].isIos).toBe(1);
  });
});
