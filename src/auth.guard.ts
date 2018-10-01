import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly moduleRef: ModuleRef) {

  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(context, request);
  }

  validateRequest(context, request): boolean {
    try {
      this.moduleRef.get(JwtService, { strict: false }).verify(request.headers['x-secret-token']);
    } catch ({message}) {
      throw new HttpException(message, HttpStatus.I_AM_A_TEAPOT);
    }
    return true;
  }
}