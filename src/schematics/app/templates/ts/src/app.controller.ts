import { Controller, Get } from '@nestjs/common';

import { sitemap } from '@core/constants';

@Controller()
export class AppController {
  @Get(sitemap.ROOT)
  entryPoint() {
    return 'OK';
  }

  @Get(sitemap.HEALTH)
  healthCheck() {
    return 'OK';
  }
}
