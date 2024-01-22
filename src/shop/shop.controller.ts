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

@Controller('shop')
@ApiTags('shop')
@ApiCookieAuth('connect.sid')
@UseInterceptors(SuccessInterceptor)
@UseGuards(AuthenticatedGuard)
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  async getShopList(@User() user) {
    return await this.shopService.getShopSkinList(user.USER_ID);
  }

  @Post()
  @ApiOperation({ summary: '상점 아이템 등록' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 500, description: '서버 에러' })
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
  @ApiOperation({ summary: '상점 아이템 구매' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  async buyItem(@User() user, @Body() body: BuyShopDto) {
    const { shop_id } = body;
    return await this.shopService.buyItem(user.USER_ID, shop_id);
  }
}
