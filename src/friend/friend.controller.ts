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
import { ResponseFriendListDto } from './dto/responseFriendList.dto';
import { FRIEND_LIST_SWAGGER_OPTION } from './swagger/friendList.option';
import { FRIEND_REQUEST_OPTION } from './swagger/friendRequest.option';
import { FRIEND_REQUESTED_OPTION } from './swagger/friendRequested.option';
import { UNAUTHORIZED_OPTION } from 'src/common/swagger/401.option';
import { INTERNER_SERVER_ERROR_OPTION } from 'src/common/swagger/500.option';
import { FRIEND_ACCEPT_OPTION } from './swagger/frinedAccept.option';
import { FRINED_SUGGEST_OPTION } from './swagger/friendSuggest.option';
import {
  FRINED_DELETE_OPTION1,
  FRINED_DELETE_OPTION2,
} from './swagger/frinedDelete.option';

@Controller('friend')
@UseInterceptors(SuccessInterceptor)
@UseGuards(AuthenticatedGuard)
@ApiTags('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get('/list')
  @ApiOperation({ summary: '친구 목록 조회' })
  @ApiResponse(FRIEND_LIST_SWAGGER_OPTION)
  @ApiResponse(UNAUTHORIZED_OPTION)
  @ApiResponse(INTERNER_SERVER_ERROR_OPTION)
  async findFriendListByUser_id(
    @User() user: UserDataDto,
  ): Promise<ResponseFriendListDto> {
    return await this.friendService.findFriendListByUser_id(user.USER_ID);
  }

  @Post('/request')
  @ApiOperation({ summary: '친구 요청' })
  @ApiResponse(FRIEND_REQUEST_OPTION)
  @ApiResponse(UNAUTHORIZED_OPTION)
  @ApiResponse(INTERNER_SERVER_ERROR_OPTION)
  async requestFriend(@User() user: any, @Body() body: FriendRequestDto) {
    return await this.friendService.requestFriend(user.USER_ID, body.friend_id);
  }

  @Get('/requested')
  @ApiOperation({ summary: '친구 요청 받은 목록 조회' })
  @ApiResponse(FRIEND_REQUESTED_OPTION)
  @ApiResponse(UNAUTHORIZED_OPTION)
  @ApiResponse(INTERNER_SERVER_ERROR_OPTION)
  async findFriendRequestListByOthersByUserID(@User() user: UserDataDto) {
    return await this.friendService.findrequestFriendListByOthersByUserID(
      user.USER_ID,
    );
  }
  @Post('/accept')
  @ApiOperation({ summary: '친구 요청 수락' })
  @ApiResponse(FRIEND_ACCEPT_OPTION)
  @ApiResponse(UNAUTHORIZED_OPTION)
  @ApiResponse(INTERNER_SERVER_ERROR_OPTION)
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
  @ApiResponse(FRINED_SUGGEST_OPTION)
  @ApiResponse(UNAUTHORIZED_OPTION)
  @ApiResponse(INTERNER_SERVER_ERROR_OPTION)
  async findRandomFriendList(@User() user: UserDataDto) {
    return await this.friendService.findRandomFriendList(user.USER_ID);
  }

  @Post('/delete')
  @ApiOperation({ summary: '친구 삭제 또는 친구 신청 거절' })
  @ApiResponse(FRINED_DELETE_OPTION1)
  @ApiResponse(FRINED_DELETE_OPTION2)
  @ApiResponse(UNAUTHORIZED_OPTION)
  @ApiResponse(INTERNER_SERVER_ERROR_OPTION)
  async deleteFriend(@User() user: UserDataDto, @Body() body: FriendAcceptDto) {
    return await this.friendService.deleteFriend(user.USER_ID, body.friend_id);
  }
}
