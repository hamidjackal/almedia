import { Module } from '@nestjs/common';
import { JobModule } from 'src/job/job.module';
import { OfferService } from './services/offer.service';
import { OfferRepository } from './repositories/offer.repository';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), JobModule],
  controllers: [],
  providers: [OfferService, OfferRepository],
  exports: [],
})
export class OfferModule {}
