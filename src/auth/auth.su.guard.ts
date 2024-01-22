import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SuperUserAuthGuard extends AuthGuard('superuser') {
  async canActivate(context: ExecutionContext) {
    const session = context.switchToHttp().getRequest().session;
    if (session && session.passport && session.passport.user) {
      if (session.passport.user.email === process.env.SUPER_ADMIN) return true;
    }
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }
}
