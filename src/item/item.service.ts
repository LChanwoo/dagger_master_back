import { Injectable } from '@nestjs/common';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async getItemList() {
    //아이템 목록을 가져온다.
    return await this.itemRepository.getItems();
  }
  // 유저의 인벤토리를 가져온다.
  async getUserInventory(user_id: number) {
    return await this.itemRepository.getUserInventory(user_id);
  }

  // 리스트에서 아이템을 찾는다.
  findItemById(items, targetId): boolean {
    for (const item of items) {
      if (item.ITEM_ID === targetId) {
        return true;
      }
    }
    return false; // ITEM_ID가 1인 요소를 찾지 못한 경우
  }
}
