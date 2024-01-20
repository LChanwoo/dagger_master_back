import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ScoreService } from './score.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { User } from 'src/common/decorators/user.decorator';
import { UserDataDto } from 'src/auth/dto/userData.dto';
import { PostScoreDto } from './dto/postScore.dto';

@Controller('score')
@UseGuards(AuthenticatedGuard)
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get()
  async getScoreList() {
    return await this.scoreService.getScoreList();
  }

  @Get('max')
  async getMaxScoreByUserId(@User() user: UserDataDto) {
    return await this.scoreService.getMaxScoreByUserId(user.USER_ID);
  }

  @Get('user')
  async getScoreListWithUser(@User() user: UserDataDto) {
    return await this.scoreService.getScoreListWithUser(user.USER_ID);
  }

  @Post()
  async createScoreByUserId(
    @User() user: UserDataDto,
    @Body() body: PostScoreDto,
  ) {
    const { score } = body;
    return await this.scoreService.createScoreByUserId(user.USER_ID, score);
  }
}
