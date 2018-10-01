import { Get, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly jwtService: JwtService) {
  }

  @Get()
  root(): string {
    return this.appService.root();
  }

  @Post('session')
  getSession(): string {
    return this.jwtService.sign({scope: 'login'}, {expiresIn: '10m'});
  }
}
