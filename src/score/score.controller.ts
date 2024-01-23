import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ScoreService } from './score.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { User } from 'src/common/decorators/user.decorator';
import { UserDataDto } from 'src/auth/dto/userData.dto';
import { PostScoreDto } from './dto/postScore.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { UNAUTHORIZED_OPTION } from 'src/common/swagger/401.option';
import { INTERNER_SERVER_ERROR_OPTION } from 'src/common/swagger/500.option';
import { GET_SCORE_LIST_OPTION } from './swagger/getSocreList.option';
import { POST_USER_SCORE_OPTION } from './swagger/postUserScore.option';
import { GET_USER_MAX_SCORE_OPTION } from './swagger/getUserMaxScore.option';
import { GET_USER_RANK_OPTION } from './swagger/getUserRank.option';

@Controller('score')
@UseGuards(AuthenticatedGuard)
@UseInterceptors(SuccessInterceptor)
@ApiTags('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get()
  @ApiOperation({ summary: '점수 리스트 조회' })
  @ApiResponse(GET_SCORE_LIST_OPTION)
  @ApiResponse(UNAUTHORIZED_OPTION)
  @ApiResponse(INTERNER_SERVER_ERROR_OPTION)
  async getScoreList() {
    return await this.scoreService.getScoreList();
  }

  @Get('max')
  @ApiOperation({ summary: '유저 최고 점수 조회' })
  @ApiResponse(GET_USER_MAX_SCORE_OPTION)
  @ApiResponse(UNAUTHORIZED_OPTION)
  @ApiResponse(INTERNER_SERVER_ERROR_OPTION)
  async getMaxScoreByUserId(@User() user: UserDataDto) {
    return await this.scoreService.getMaxScoreByUserId(user.USER_ID);
  }

  @Get('user')
  @ApiOperation({ summary: '유저 랭킹 조회' })
  @ApiResponse(GET_USER_RANK_OPTION)
  @ApiResponse(UNAUTHORIZED_OPTION)
  @ApiResponse(INTERNER_SERVER_ERROR_OPTION)
  async getScoreListWithUser(@User() user: UserDataDto) {
    return await this.scoreService.getScoreListWithUser(user.USER_ID);
  }

  @Post()
  @ApiOperation({ summary: '유저 점수 등록' })
  @ApiResponse(POST_USER_SCORE_OPTION)
  @ApiResponse({ status: 400, description: '점수가 없음' })
  @ApiResponse(UNAUTHORIZED_OPTION)
  @ApiResponse(INTERNER_SERVER_ERROR_OPTION)
  async createScoreByUserId(
    @User() user: UserDataDto,
    @Body() body: PostScoreDto,
  ) {
    const { score } = body;
    return await this.scoreService.createScoreByUserId(user.USER_ID, score);
  }
}
