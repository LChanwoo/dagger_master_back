import { Injectable } from '@nestjs/common';
import { MysqlService } from 'src/mysql/mysql.service';

@Injectable()
export class ItemRepository {
  constructor(private readonly mysqlService: MysqlService) {}

  async getItems() {
    const query = `
            SELECT * FROM TB_ITEM;
        `;
    return await this.mysqlService.query(query);
  }
  async createUserInventory(userId: number) {
    const Items = await this.getItems();
    const query = `
            INSERT INTO TB_INVENTORY
                (USER_ID, ITEM_ID, QTY)
            VALUES (?, ?, ?);
        `;
    const queries = Items.map(async (item) => {
      const params = [userId, item.ITEM_ID, 0];
      return await this.mysqlService.query(query, params);
    });
    await Promise.all(queries);
  }

  async getUserInventory(userId: number) {
    const query = `
                SELECT
                    A.ITEM_ID,
                    B.ITEM_NAME,
                    B.ITEM_TYPE,
                    B.ITEM_DESCRIPTION,
                    A.QTY
                FROM TB_INVENTORY A
                INNER JOIN TB_ITEM B
                ON A.ITEM_ID = B.ITEM_ID
                WHERE USER_ID = ?;
            `;
    const params = [userId];
    return await this.mysqlService.query(query, params);
  }
  async getUserInventoryWithItemTypeByUserId(userId: number, itemType: string) {
    const query = `
                SELECT A.*
                FROM TB_INVENTORY A
                    INNER JOIN TB_ITEM B
                    ON A.ITEM_ID = B.ITEM_ID
                WHERE
                    USER_ID = ? AND ITEM_TYPE = ?;
            `;
    const params = [userId, itemType];
    return await this.mysqlService.query(query, params);
  }
  async addNotHaveItemToInventoryByItemId(user_id: number, itemId: number) {
    const query = `
            INSERT INTO TB_INVENTORY
                (USER_ID, ITEM_ID, QTY)
            VALUES (?, ?, 0);
        `;
    const params = [itemId, user_id];
    return await this.mysqlService.query(query, params);
  }

  async addItemInInventoryByItemId(
    user_id: number,
    itemId: number,
    itemQty: number,
  ) {
    console.log(itemQty);
    const query = `
            UPDATE TB_INVENTORY
            SET QTY = QTY + ?
            WHERE ITEM_ID = ? AND USER_ID = ?;
        `;
    const params = [itemQty, itemId, user_id];
    return await this.mysqlService.query(query, params);
  }

  async addPlayerGoldByUserId(user_id: number, gold: number) {
    const query = `
            UPDATE TB_INVENTORY
            SET QTY = QTY + ?
            WHERE USER_ID = ? AND ITEM_ID = 1;
        `;
    const params = [gold, user_id];
    return await this.mysqlService.query(query, params);
  }
}
