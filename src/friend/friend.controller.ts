import { Body, Controller, Get, Post } from '@nestjs/common';
import { FriendService } from './friend.service';
import { User } from 'src/common/decorators/user.decorator';
import { UserDataDto } from 'src/auth/dto/userData.dto';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get('/list')
  async findFriendListByUser_id(@User() user: UserDataDto) {
    return await this.friendService.findFriendListByUser_id(user.USER_ID);
  }

  @Post('/request')
  async requestFriend(@User() user: any, @Body() body: any) {
    return await this.friendService.requestFriend(user.USER_ID, body.friend_id);
  }

  @Get('/requested')
  async findFriendRequestListByOthersByUserID(@User() user: UserDataDto) {
    return await this.friendService.findrequestFriendListByOthersByUserID(
      user.USER_ID,
    );
  }
  @Post('/accept')
  async acceptFriendByUsersId(@User() user: UserDataDto, @Body() body: any) {
    return await this.friendService.acceptFriendByUsersId(
      user.USER_ID,
      body.friend_id,
    );
  }

  @Get('/suggest')
  async findRandomFriendList(@User() user: UserDataDto) {
    return await this.friendService.findRandomFriendList(user.USER_ID);
  }

  @Post('/delete')
  async deleteFriend(@User() user: UserDataDto, @Body() body: any) {
    return await this.friendService.deleteFriend(user.USER_ID, body.friend_id);
  }
}
