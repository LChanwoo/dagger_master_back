import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ShopService } from './shop.service';
import { User } from 'src/common/decorators/user.decorator';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('shop')
@UseGuards(AuthenticatedGuard)
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  async getShopList(@User() user) {
    return await this.shopService.getShopSkinList(user.USER_ID);
  }

  @Post()
  async postShopItem(@Body() body: any) {
    const { item_id, start_date, price, end_date } = body;
    console.log(item_id, start_date, price, end_date);
    return await this.shopService.postShopItem(
      item_id,
      price,
      start_date,
      end_date,
    );
  }
  @Post('buy')
  async buyItem(@User() user, @Body() body: any) {
    const { shop_id } = body;
    return await this.shopService.buyItem(user.USER_ID, shop_id);
  }
}
