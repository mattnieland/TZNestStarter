import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';

import { AppService } from './app.service';

@ApiTags('System')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    description: 'For metrics server health checking',
    summary: AppController.prototype.healthz.name,
  })
  @ApiOkResponse({
    // Because only return string here, no schema, so write the example directly
    content: {
      'application/json': {
        example: {
          data: 'OK',
        },
      },
    },
    description: 'Return OK',
  })
  @SkipThrottle({ default: false })
  @Get(AppController.prototype.healthz.name)
  healthz(): string {
    return this.appService.healthz();
  }
}
