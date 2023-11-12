import { Test, TestingModule } from '@nestjs/testing';
import { OfferService } from './offer.service';
import { Provider1Service } from '../../job/services/provider1.service';
import { Provider2Service } from '../../job/services/provider2.service';
import { OfferRepository } from '../repositories/offer.repository';
import { OfferDto } from '../dtos/offer.dto.';

describe('OfferService', () => {
  let offerService: OfferService;
  let provier1Service: Provider1Service;
  let provider2Service: Provider2Service;
  let offerRepository: OfferRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OfferService,
        {
          provide: Provider1Service,
          useValue: {
            getOffers: jest.fn(),
          },
        },
        {
          provide: Provider2Service,
          useValue: {
            getOffers: jest.fn(),
          },
        },
        {
          provide: OfferRepository,
          useValue: {
            saveOffers: jest.fn(),
          },
        },
      ],
    }).compile();

    offerService = module.get<OfferService>(OfferService);
    provier1Service = module.get<Provider1Service>(Provider1Service);
    provider2Service = module.get<Provider2Service>(Provider2Service);
    offerRepository = module.get<OfferRepository>(OfferRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(offerService).toBeDefined();
  });

  describe('offerJob', () => {
    it('should call getOffers from providers', async () => {
      await offerService.offerJob();

      expect(provier1Service.getOffers).toHaveBeenCalled();
      expect(provider2Service.getOffers).toHaveBeenCalled();
    });

    it('should call saveOffers from repository', async () => {
      const mockOffer: OfferDto = {
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
      };
      jest.spyOn(provier1Service, 'getOffers').mockResolvedValueOnce([mockOffer]);
      jest.spyOn(provider2Service, 'getOffers').mockResolvedValueOnce([mockOffer]);

      await offerService.offerJob();

      expect(offerRepository.saveOffers).toHaveBeenCalledWith([mockOffer, mockOffer]);
    });

    it('should log an error when a job fails', async () => {
      const mockError = 'mock error';
      jest.spyOn(provier1Service, 'getOffers').mockRejectedValueOnce(mockError);

      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

      await offerService.offerJob();

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        `Failed to get the job because ${mockError}`,
      );
    });
  });
});
