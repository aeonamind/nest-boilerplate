import { Routes } from '@nestjs/core';

import { sitemap } from '@core/constants';
import { CatModule } from '@modules/cat';

export const routes: Routes = [
  {
    path: sitemap.cat.PREFIX,
    module: CatModule,
  },
];
