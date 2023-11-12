import { Test, TestingModule } from '@nestjs/testing';
import { Provider1Service } from './provider1.service';
import { payload } from '../payloads/payload1';

describe('Provider1Service', () => {
  let provider1Service: Provider1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Provider1Service],
    }).compile();

    provider1Service = module.get<Provider1Service>(Provider1Service);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(provider1Service).toBeDefined();
  });

  describe('getOffers', () => {
    it('should return an array of offers', async () => {
      const offers = await provider1Service.getOffers();
      expect(offers).toBeDefined();
      expect(offers.length).toBe(1);
      expect(offers[0].externalOfferId).toBe(payload.response.offers[0].offer_id);
      expect(offers[0].thumbnail).toBe(payload.response.offers[0].image_url);
      expect(offers[0].name).toBe(payload.response.offers[0].offer_name);
      expect(offers[0].offerUrlTemplate).toBe(payload.response.offers[0].offer_url);
      expect(offers[0].description).toBe(payload.response.offers[0].offer_desc);
      expect(offers[0].requirements).toBe(payload.response.offers[0].call_to_action);
      expect(offers[0].isDesktop).toBe(0);
      expect(offers[0].isAndroid).toBe(0);
      expect(offers[0].isIos).toBe(1);
    });
  });
});
