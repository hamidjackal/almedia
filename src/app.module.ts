import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { AppLoggerMiddleware } from './core/middlewares/logger.middleware';
import { OfferModule } from './offer/offer.module';
import { JobModule } from './job/job.module';

@Module({
  imports: [HealthCheckModule, OfferModule, JobModule],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
