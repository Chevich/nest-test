import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { LoggerMiddleware } from './logger.middleware';
import { Logger2Middleware } from './logger2.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  imports: [JwtModule.register({secretOrPrivateKey: '7777777'})],
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .with('Cats Module')
      .forRoutes({path: 'cats', method: RequestMethod.POST});
    consumer
      .apply(Logger2Middleware)
      .with('Cats Module')
      .forRoutes({path: 'cats', method: RequestMethod.GET});
  }
}