import { Module } from '@nestjs/common';
import { Provider1Service } from './services/provider1.service';
import { Provider2Service } from './services/provider2.service';

@Module({
  providers: [Provider1Service, Provider2Service],
  exports: [Provider1Service, Provider2Service],
})
export class JobModule {}
