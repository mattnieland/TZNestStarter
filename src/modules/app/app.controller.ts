import { NormalException, Version } from '@destify-dev/shared-be-utils';
import { Controller, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { toSwaggerError } from '@util/helper';

import { AppService } from './app.service';

@ApiTags('System')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    description: 'Get the app version',
    summary: AppController.prototype.getVersion.name,
  })
  @ApiOkResponse({
    description: 'Return current version',
    type: Version,
  })
  @ApiBadRequestResponse(toSwaggerError(NormalException.UNEXPECTED()))
  @SkipThrottle({ default: false })
  @Get('version')
  getVersion(): Version {
    return this.appService.getVersion();
  }

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
