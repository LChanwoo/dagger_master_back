import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class SuperUserStrategy extends PassportStrategy(Strategy, 'superuser') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'address',
      passwordField: 'password',
    });
  }

  async validate(address: string, password: string, done: any) {
    try {
      let user = await this.authService.validateSuperUser(address, password);
      if (!user) {
        return done(null, false, { message: 'Incorrect address or password' });
      }
      return user;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
