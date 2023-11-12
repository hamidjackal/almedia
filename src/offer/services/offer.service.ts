import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Provider1Service } from '../../job/services/provider1.service';
import { Provider2Service } from '../../job/services/provider2.service';
import { OfferRepository } from '../repositories/offer.repository';
import { OfferDto } from '../dtos/offer.dto.';

@Injectable()
export class OfferService {
  constructor(
    private provier1Service: Provider1Service,
    private provider2Service: Provider2Service,
    private offerRepository: OfferRepository,
  ) {}

  @Cron('0 * * * * *')
  async offerJob() {
    const jobResults = await Promise.allSettled([
      this.provier1Service.getOffers(),
      this.provider2Service.getOffers(),
    ]);

    const succeededJobs = jobResults.filter(
      (job) => job.status === 'fulfilled',
    ) as PromiseFulfilledResult<OfferDto[]>[];

    const allSucceededJobs = succeededJobs.map((job) => job.value).flat();
    await this.offerRepository.saveOffers(allSucceededJobs);

    const allFailedJobs = jobResults.filter(
      (job) => job.status === 'rejected',
    ) as PromiseRejectedResult[];

    allFailedJobs.forEach((job) => {
      console.warn(`Failed to get the job because ${job.reason}`);
    });
  }
}
