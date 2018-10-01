import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {

  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(context, request);
  }

  validateRequest(context, request): boolean {
    try {
      this.jwtService.verify(request.headers['x-secret-token']);
    } catch ({message}) {
      throw new HttpException(message, HttpStatus.I_AM_A_TEAPOT);
    }
    return true;
  }
}