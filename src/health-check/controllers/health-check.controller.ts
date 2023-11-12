import { Get, Controller } from '@nestjs/common';
import { SerializeResponse } from '../../core/interceptors/response-serializer.interceptor';

@Controller('health-check')
@SerializeResponse()
export class HealthCheckController {
  constructor() {}

  @Get()
  async checkHealth() {
    return { status: 'Healthy' };
  }
}
