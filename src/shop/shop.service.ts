import { Injectable } from '@nestjs/common';
import { ShopRepository } from './shop.repository';
import { ItemService } from 'src/item/item.service';
import { ItemRepository } from 'src/item/item.repository';

@Injectable()
export class ShopService {
  constructor(
    private readonly shopRepository: ShopRepository,
    private readonly itemRepository: ItemRepository,
    private readonly itemService: ItemService,
  ) {}

  async getShopSkinList(user_id: number) {
    return await this.shopRepository.getShopListOfSkin(user_id);
  }

  async postShopItem(
    item_id: number,
    price: number,
    start_date: string,
    end_date: string,
  ) {
    await this.shopRepository.postShopItem(
      item_id,
      price,
      start_date,
      end_date,
    );
    return {
      message: 'success',
      requested: {
        item_id,
        price,
        start_date,
        end_date,
      },
    };
  }
  async buyItem(user_id: number, shop_id: number) {
    const item = (
      await this.shopRepository.getItemInfoByShopId(user_id, shop_id)
    )[0];
    const isHave = item.IS_HAVE;
    console.log(isHave);
    if (isHave > 0) {
      return {
        message: '이미 구매한 아이템입니다.',
        requested: {
          shop_id,
        },
      };
    }
    const userGold = (await this.itemRepository.getGoldByUserId(user_id))[0]
      .QTY;
    if (userGold < item.SHOP_ITEM_PRICE) {
      return {
        message: '골드가 부족합니다.',
        requested: {
          shop_id,
        },
      };
    }
    const item_id = item.SHOP_ITEM_ID;
    const price = item.SHOP_ITEM_PRICE;
    const qty = 1;
    await this.itemRepository.addItemInInventoryByItemId(user_id, item_id, qty);
    await this.itemRepository.subtractPlayerGoldByUserId(user_id, price);
    return {
      message: 'success',
      requested: {
        shop_id,
        item_id,
        item_name: item.ITEM_NAME,
        price,
      },
    };
  }
}
