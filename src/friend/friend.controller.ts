import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FriendService } from './friend.service';
import { User } from 'src/common/decorators/user.decorator';
import { UserDataDto } from 'src/auth/dto/userData.dto';
import { FriendAcceptDto } from './dto/friendAccept.dto';
import { FriendRequestDto } from './dto/friendRequest.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('friend')
@UseInterceptors(SuccessInterceptor)
@UseGuards(AuthenticatedGuard)
@ApiTags('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get('/list')
  @ApiOperation({ summary: '친구 목록 조회' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 401, description: '로그인 필요' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  async findFriendListByUser_id(@User() user: UserDataDto) {
    return await this.friendService.findFriendListByUser_id(user.USER_ID);
  }

  @Post('/request')
  @ApiOperation({ summary: '친구 요청' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 401, description: '로그인 필요' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  async requestFriend(@User() user: any, @Body() body: FriendRequestDto) {
    return await this.friendService.requestFriend(user.USER_ID, body.friend_id);
  }

  @Get('/requested')
  @ApiOperation({ summary: '친구 요청 받은 목록 조회' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 401, description: '로그인 필요' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  async findFriendRequestListByOthersByUserID(@User() user: UserDataDto) {
    return await this.friendService.findrequestFriendListByOthersByUserID(
      user.USER_ID,
    );
  }
  @Post('/accept')
  @ApiOperation({ summary: '친구 요청 수락' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 401, description: '로그인 필요' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  async acceptFriendByUsersId(
    @User() user: UserDataDto,
    @Body() body: FriendAcceptDto,
  ) {
    return await this.friendService.acceptFriendByUsersId(
      user.USER_ID,
      body.friend_id,
    );
  }

  @Get('/suggest')
  @ApiOperation({ summary: '추천 친구 리스트' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 401, description: '로그인 필요' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  async findRandomFriendList(@User() user: UserDataDto) {
    return await this.friendService.findRandomFriendList(user.USER_ID);
  }

  @Post('/delete')
  @ApiOperation({ summary: '친구 삭제 또는 친구 신청 거절' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 401, description: '로그인 필요' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  async deleteFriend(@User() user: UserDataDto, @Body() body: FriendAcceptDto) {
    return await this.friendService.deleteFriend(user.USER_ID, body.friend_id);
  }
}
