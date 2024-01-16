import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string, done: any) {
    console.log('validate');
    try {
      let user = await this.authService.validateUser(email, password);
      if (!user) {
        user = await this.authService.createUser(email, password);
      }
      return user;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
