import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  async use(_: Request, res: Response, next: NextFunction) {
    res.removeHeader('x-powered-by');
    res.removeHeader('X-Powered-By');

    next();
  }
}
