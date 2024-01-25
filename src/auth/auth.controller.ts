import {
  Body,
  Controller,
  Inject,
  Logger,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { LoginDto } from './dto/login.dto';
import { AuthenticatedGuard } from './authenticated.guard';
import { UserDataDto } from './dto/userData.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperUserAuthGuard } from './auth.su.guard';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { UNAUTHORIZED_OPTION } from 'src/common/swagger/401.option';
import { INTERNER_SERVER_ERROR_OPTION } from 'src/common/swagger/500.option';
import { SuperLoginDto } from './dto/superLogin.dto copy';
import { SUPER_USER_LOGIN_OPTION } from './swagger/superUserLogin.option';
import { USER_LOGIN_OPTION } from './swagger/userLogin.option';

@Controller('auth')
@UseInterceptors(SuccessInterceptor)
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private readonly logger = new Logger('HTTP');

  @Post('/superuser')
  @UseGuards(SuperUserAuthGuard)
  @ApiOperation({ summary: '슈퍼유저 로그인' })
  @ApiResponse(SUPER_USER_LOGIN_OPTION)
  @ApiResponse(UNAUTHORIZED_OPTION)
  @ApiResponse(INTERNER_SERVER_ERROR_OPTION)
  public async superuserLogin(
    @User() user: any,
    @Body() body: SuperLoginDto,
  ): Promise<any> {
    return user;
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: '로그인' })
  @ApiResponse(USER_LOGIN_OPTION)
  @ApiResponse(UNAUTHORIZED_OPTION)
  @ApiResponse(INTERNER_SERVER_ERROR_OPTION)
  public async login(
    @User() user: UserDataDto,
    @Body() body: LoginDto,
  ): Promise<any> {
    const { SUB_ID, CREATE_DATE, ...result } = user;
    const now = new Date();
    this.logger.log(
      `${now.toLocaleString()} ${user.EMAIL}님이 로그인하셨습니다.`,
    );
    const attendanceCheck = await this.authService.checkAttendance(
      user.USER_ID,
    );
    return attendanceCheck;
  }

  @Post('/logout')
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({ summary: '로그아웃' })
  @ApiResponse({ status: 201, description: '성공' })
  public async logout(@Req() req: any) {
    try {
      req.session.destroy();
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
