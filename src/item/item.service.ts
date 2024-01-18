import { Injectable } from '@nestjs/common';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async getItemList() {
    return await this.itemRepository.getItems();
  }

  async getUserInventory(user_id: number) {
    return await this.itemRepository.getUserInventory(user_id);
  }

  findItemById(items, targetId): boolean {
    for (const item of items) {
      if (item.ITEM_ID === targetId) {
        return true;
      }
    }
    return false; // ITEM_ID가 1인 요소를 찾지 못한 경우
  }
}
