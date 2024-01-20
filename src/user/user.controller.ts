import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/common/decorators/user.decorator';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ItemService } from 'src/item/item.service';
import { UserDataDto } from 'src/auth/dto/userData.dto';
import { PostNicknameDto } from './dto/postNickname.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly itemService: ItemService,
  ) {}

  //   @Post('nickname')
  //   async changeNickname(@User() user: any) {
  //     return await this.userService.changeNickname();
  //   }

  @Get('all')
  async getAllUser() {
    return await this.userService.getAllUser();
  }

  @Post('nickname')
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({ summary: '닉네임 변경' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  async changeNickname(
    @User() user: UserDataDto,
    @Body() body: PostNicknameDto,
  ) {
    return await this.userService.changeNickname(user.USER_ID, body.nickname);
  }

  @Get('inventory')
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({ summary: '인벤토리 조회' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  async getUserInventory(@User() user: any) {
    return await this.itemService.getUserInventory(user.USER_ID);
  }
}
