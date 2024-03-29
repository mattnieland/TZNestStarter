import type { TestingModule } from '@nestjs/testing';

import { Test } from '@nestjs/testing';

import { AppService } from '../src/modules/app/app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  // describe('getVersion()', () => {
  //   it('should return version number', () => {
  //     const result: Version = {
  //       version: process.env.npm_package_version,
  //     };
  //     expect(service.getVersion()).toEqual(result);
  //   });
  // });

  describe('healthz()', () => {
    it('should return health status', () => {
      expect(service.healthz()).toEqual('OK');
    });
  });
});
