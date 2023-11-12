import 'reflect-metadata';
import { Provider2Dto } from './provider2.dto';
import { plainToInstance } from 'class-transformer';

describe('Provider2Dto', () => {
  it('should map to offer', () => {
    const data = {
      data: {
        '1': {
          Offer: {
            campaign_id: 1,
            icon: 'icon',
            name: 'name',
            tracking_url: 'tracking_url',
            instructions: 'instructions',
            description: 'description',
          },
          OS: {
            android: false,
            ios: false,
            web: true,
          },
        },
      },
    };
    const provider2Dto = plainToInstance(Provider2Dto, data);
    const offer = provider2Dto.mapToOffer();

    expect(offer).toBeDefined();
    expect(offer.length).toBe(1);
    expect(offer[0].externalOfferId).toBe('1');
    expect(offer[0].thumbnail).toBe('icon');
    expect(offer[0].name).toBe('name');
    expect(offer[0].offerUrlTemplate).toBe('tracking_url');
    expect(offer[0].description).toBe('description');
    expect(offer[0].requirements).toBe('instructions');
    expect(offer[0].isDesktop).toBe(1);
    expect(offer[0].isAndroid).toBe(0);
    expect(offer[0].isIos).toBe(0);
  });
});
