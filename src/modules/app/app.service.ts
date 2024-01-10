import type { Version } from '@destify-dev/shared-be-utils';

import { Injectable } from '@nestjs/common';

import * as packageJSON from '../../../package.json';

@Injectable()
export class AppService {
  public getVersion(): Version {
    return { version: packageJSON.version };
  }

  public healthz(): string {
    return 'OK';
  }
}
