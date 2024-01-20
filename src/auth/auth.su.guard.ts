import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SuperUserAuthGuard extends AuthGuard('superuser') {
  async canActivate(context: ExecutionContext) {
    console.log('SuperUserAuthGuard');
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }
}
