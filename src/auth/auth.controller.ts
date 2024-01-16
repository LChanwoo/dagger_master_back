import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { LoginDto } from './dto/login.dto';
import { AuthenticatedGuard } from './authenticated.guard';
import { UserDataDto } from './dto/userData.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  public async login(@User() user: UserDataDto) {
    return user;
    // return this.logger.log(user.email + ' logged in ' + new Date().toISOString());
  }

  @Post('/logout')
  @UseGuards(AuthenticatedGuard)
  public async logout(@Req() req: any) {
    try {
      req.session.destroy();
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
