import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/common/decorators/user.decorator';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ItemService } from 'src/item/item.service';
import { UserDataDto } from 'src/auth/dto/userData.dto';
import { PostNicknameDto } from './dto/postNickname.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { POST_NICKNAME_OPTION } from './swagger/postNickName.option';
import { INTERNER_SERVER_ERROR_OPTION } from 'src/common/swagger/500.option';
import { GET_USER_INVENTORY_OPTION } from './swagger/getUserInventory.option';

@Controller('user')
@UseInterceptors(SuccessInterceptor)
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly itemService: ItemService,
  ) {}

  //   @Get('all')
  //   async getAllUser() {
  //     return await this.userService.getAllUser();
  //   }

  @Post('nickname')
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({ summary: '닉네임 변경' })
  @ApiResponse(POST_NICKNAME_OPTION)
  @ApiResponse(INTERNER_SERVER_ERROR_OPTION)
  async changeNickname(
    @User() user: UserDataDto,
    @Body() body: PostNicknameDto,
  ) {
    return await this.userService.changeNickname(user.USER_ID, body.nickname);
  }

  @Get('inventory')
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({ summary: '인벤토리 조회' })
  @ApiResponse(GET_USER_INVENTORY_OPTION)
  @ApiResponse(INTERNER_SERVER_ERROR_OPTION)
  async getUserInventory(@User() user: any) {
    return await this.itemService.getUserInventory(user.USER_ID);
  }
}
