import {
  Body,
  Controller,
  Inject,
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

@Controller('auth')
@UseInterceptors(SuccessInterceptor)
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/superuser')
  @UseGuards(SuperUserAuthGuard)
  @ApiOperation({ summary: '슈퍼유저 로그인' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 401, description: '로그인 실패' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  public async superuserLogin(
    @User() user: any,
    @Body() body: any,
  ): Promise<any> {
    return user;
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 401, description: '로그인 실패' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  public async login(
    @User() user: UserDataDto,
    @Body() body: LoginDto,
  ): Promise<any> {
    const { SUB_ID, CREATE_DATE, ...result } = user;
    return result;
  }

  @Post('/logout')
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({ summary: '로그아웃' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 401, description: '로그인 필요' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  public async logout(@Req() req: any) {
    try {
      req.session.destroy();
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
