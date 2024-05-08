import { Module } from '@nestjs/common';
import { Request } from 'express';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      guard: {
        mount: true,
        setup(cls, context) {
          const req = context.switchToHttp().getRequest<Request>();
          cls.set(
            'id',
            req.params['id'] ? parseInt(req.params['id']) : undefined,
          );
        },
      },
    }),
  ],
})
export class AsyncContextModule {}
