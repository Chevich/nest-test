import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [CatsModule, JwtModule.register({secretOrPrivateKey: '7777777'})],
  controllers: [AppController],
  providers: [AppService],
  exports: [JwtModule],
})
export class AppModule {
}
