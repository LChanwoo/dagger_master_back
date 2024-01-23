import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { User } from 'src/common/decorators/user.decorator';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { PostShopDto } from './dto/postShop.dto';
import { BuyShopDto } from './dto/buyShop.dto';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { SuperUserAuthGuard } from 'src/auth/auth.su.guard';
import { INTERNER_SERVER_ERROR_OPTION } from 'src/common/swagger/500.option';
import { SHOP_LIST_OPTION } from './swagger/shopList.option';
import { UNAUTHORIZED_OPTION } from 'src/common/swagger/401.option';
import { POST_SHOP_ITEM_OPTION } from './swagger/postShopItem.option';
import { BUY_SHOP_ITEM_OPTION } from './swagger/buyShopItem.option';

@Controller('shop')
@ApiTags('shop')
@ApiCookieAuth('connect.sid')
@UseInterceptors(SuccessInterceptor)
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({ summary: '상점 아이템 조회' })
  @ApiResponse(SHOP_LIST_OPTION)
  @ApiResponse(UNAUTHORIZED_OPTION)
  @ApiResponse(INTERNER_SERVER_ERROR_OPTION)
  async getShopList(@User() user) {
    return await this.shopService.getShopSkinList(user.USER_ID);
  }

  @Post()
  @UseGuards(SuperUserAuthGuard)
  @ApiOperation({ summary: '상점 아이템 등록' })
  @ApiResponse(POST_SHOP_ITEM_OPTION)
  @ApiResponse(INTERNER_SERVER_ERROR_OPTION)
  async postShopItem(@Body() body: PostShopDto) {
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
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({ summary: '상점 아이템 구매' })
  @ApiResponse(BUY_SHOP_ITEM_OPTION)
  @ApiResponse(INTERNER_SERVER_ERROR_OPTION)
  async buyItem(@User() user, @Body() body: BuyShopDto) {
    const { shop_id } = body;
    return await this.shopService.buyItem(user.USER_ID, shop_id);
  }
}
