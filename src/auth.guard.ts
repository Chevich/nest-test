import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Observable} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return AuthGuard.validateRequest(request);
    }

    static validateRequest(request): boolean {
       return request.headers['x-secret-token'] === '123123123';
    }
}