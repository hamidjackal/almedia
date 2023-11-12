import { Test, TestingModule } from '@nestjs/testing';
import { Provider2Service } from './provider2.service';
import { payload } from '../payloads/payload2';

describe('Provider2Service', () => {
  let provider2Service: Provider2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Provider2Service],
    }).compile();

    provider2Service = module.get<Provider2Service>(Provider2Service);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(provider2Service).toBeDefined();
  });

  describe('getOffers', () => {
    it('should return an array of offers', async () => {
      const offers = await provider2Service.getOffers();
      expect(offers).toBeDefined();
      expect(offers.length).toBe(1);
      expect(offers[0].externalOfferId).toBe(
        payload.data['15828'].Offer.campaign_id.toString(),
      );
    });
  });
});
