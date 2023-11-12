import { Test, TestingModule } from '@nestjs/testing';
import { OfferDto } from '../dtos/offer.dto.';
import { OfferRepository } from './offer.repository';

describe('OfferRepository', () => {
  let repository: OfferRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfferRepository],
    }).compile();

    repository = module.get<OfferRepository>(OfferRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('saveOffers', () => {
    it('should save offers', async () => {
      const offers: OfferDto[] = [
        {
          externalOfferId: 'mock id',
          thumbnail: 'mock thumbnail',
          name: 'mock name',
          description: 'mock description',
          requirements: 'mock requirements',
          isDesktop: 1,
          isAndroid: 1,
          isIos: 1,
          providerName: 'mock provider name',
          slug: 'mock slug',
          offerUrlTemplate: 'mock offer url template',
        },
      ];

      const spy = jest.spyOn(console, 'log');

      await repository.saveOffers(offers);

      expect(spy).toHaveBeenCalledWith('Offers saved successfully', expect.anything());
    });
  });
});
