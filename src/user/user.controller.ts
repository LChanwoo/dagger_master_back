import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/common/decorators/user.decorator';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ItemService } from 'src/item/item.service';
import { UserDataDto } from 'src/auth/dto/userData.dto';

@Controller('user')
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
  async changeNickname(@User() user: UserDataDto, @Body() body: any) {
    return await this.userService.changeNickname(user.USER_ID, body.nickname);
  }

  @Get('inventory')
  @UseGuards(AuthenticatedGuard)
  async getUserInventory(@User() user: any) {
    return await this.itemService.getUserInventory(user.USER_ID);
  }
}
