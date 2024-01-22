import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ScoreService } from './score.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { User } from 'src/common/decorators/user.decorator';
import { UserDataDto } from 'src/auth/dto/userData.dto';
import { PostScoreDto } from './dto/postScore.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('score')
@UseGuards(AuthenticatedGuard)
@UseInterceptors(SuccessInterceptor)
@ApiTags('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get()
  async getScoreList() {
    return await this.scoreService.getScoreList();
  }

  @Get('max')
  @ApiOperation({ summary: '유저 최고 점수 조회' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 401, description: '로그인 필요' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  async getMaxScoreByUserId(@User() user: UserDataDto) {
    return await this.scoreService.getMaxScoreByUserId(user.USER_ID);
  }

  @Get('user')
  @ApiOperation({ summary: '유저 점수 조회' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 401, description: '로그인 필요' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  async getScoreListWithUser(@User() user: UserDataDto) {
    return await this.scoreService.getScoreListWithUser(user.USER_ID);
  }

  @Post()
  @ApiOperation({ summary: '유저 점수 등록' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 401, description: '로그인 필요' })
  @ApiResponse({ status: 400, description: '점수가 없음' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  async createScoreByUserId(
    @User() user: UserDataDto,
    @Body() body: PostScoreDto,
  ) {
    const { score } = body;
    return await this.scoreService.createScoreByUserId(user.USER_ID, score);
  }
}
