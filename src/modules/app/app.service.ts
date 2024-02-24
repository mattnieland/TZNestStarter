import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public healthz(): string {
    return 'OK';
  }
}
