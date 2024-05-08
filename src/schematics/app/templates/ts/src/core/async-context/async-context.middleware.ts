import { Injectable } from '@nestjs/common';
import { ClsMiddleware } from 'nestjs-cls';

// this middleware should be registered first in the list of middlewares in the app module
// so must be use in app.use (global scope) instead of register in async-context module (module scope)
@Injectable()
export class AsyncContextMiddleware extends ClsMiddleware {
  constructor() {
    super({
      setup(cls) {
        cls.set('startAt', process.hrtime.bigint());
        cls.set('user', {});
      },
    });
  }
}
