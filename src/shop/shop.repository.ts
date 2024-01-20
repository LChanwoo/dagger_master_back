import { Injectable } from '@nestjs/common';
import { ItemRepository } from 'src/item/item.repository';
import { MysqlService } from 'src/mysql/mysql.service';

@Injectable()
export class ShopRepository {
  // CREATE TABLE TB_SHOP(
  // SHOP_ID INT PRIMARY KEY AUTO_INCREMENT,
  // SHOP_ITEM_ID INT NOT NULL,
  // SHOP_ITEM_PRICE INT NOT NULL,
  // SALES_START_DATE DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  // SALES_END_DATE DATETIME NOT NULL,

  //     CONSTRAINT FK_SHOP_ITEM_ FOREIGN KEY (SHOP_ITEM_ID) REFERENCES TB_ITEM(ITEM_ID)
  // );
  constructor(
    private readonly mysqlService: MysqlService,
    private readonly itemRepository: ItemRepository,
  ) {}

  async getShopListOfSkin(user_id: number) {
    const query = `
                SELECT
                    A.SHOP_ID,
                    A.SHOP_ITEM_ID,
                    A.SHOP_ITEM_PRICE,
                    A.SALES_START_DATE,
                    A.SALES_END_DATE,
                    B.ITEM_NAME,
                    CASE
                        WHEN (C.QTY IS NULL OR C.QTY=0 ) THEN 0
                        ELSE 1
                    END AS IS_HAVE
                FROM TB_SHOP A
                    INNER JOIN TB_ITEM B
                    ON A.SHOP_ITEM_ID = B.ITEM_ID
                    INNER JOIN TB_INVENTORY C
                    ON A.SHOP_ITEM_ID = C.ITEM_ID
                WHERE SALES_START_DATE <= NOW()
                    AND SALES_END_DATE >= NOW()
                    AND B.ITEM_TYPE = 'SKIN'
                    AND C.USER_ID = ?;
            `;
    const params = [user_id];
    return await this.mysqlService.query(query, params);
  }
  async postShopItem(
    itemId: number,
    price: number,
    startDate: string,
    endDate: string,
  ) {
    const query = `
            INSERT INTO TB_SHOP
                (SHOP_ITEM_ID, SHOP_ITEM_PRICE, SALES_START_DATE, SALES_END_DATE)
            VALUES (?, ?, ?, ?);
        `;
    const params = [itemId, price, startDate, endDate];
    return await this.mysqlService.query(query, params);
  }
  async getItemInfoByShopId(user_id: number, shopId: number) {
    const query = `
                SELECT
                    A.SHOP_ID,
                    A.SHOP_ITEM_ID,
                    A.SHOP_ITEM_PRICE,
                    A.SALES_START_DATE,
                    A.SALES_END_DATE,
                    B.ITEM_NAME,
                    B.ITEM_TYPE,
                    CASE
                        WHEN (C.QTY IS NULL OR C.QTY=0 ) THEN 0
                        ELSE 1
                    END AS IS_HAVE
                FROM TB_SHOP A
                    INNER JOIN TB_ITEM B
                    ON A.SHOP_ITEM_ID = B.ITEM_ID
                    INNER JOIN TB_INVENTORY C
                    ON A.SHOP_ITEM_ID = C.ITEM_ID
                WHERE SALES_START_DATE <= NOW()
                AND SALES_END_DATE >= NOW()
                AND B.ITEM_TYPE = 'SKIN'
                AND C.USER_ID = ?
                AND SHOP_ID = ?;
            `;
    const params = [user_id, shopId];
    return await this.mysqlService.query(query, params);
  }
}
