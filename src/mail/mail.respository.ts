import { Injectable } from '@nestjs/common';
import { MysqlService } from 'src/mysql/mysql.service';

@Injectable()
export class MailRepository {
  constructor(private readonly mysqlService: MysqlService) {}

  async findMailByUserId(user_id: number) {
    const query = `
            SELECT *
            FROM TB_MAIL
            WHERE USER_ID = ? AND ;
        `;
    const params = [user_id];
    return await this.mysqlService.query(query, params);
  }

  async findMailByMailId(mail_id: number) {
    const query = `
            SELECT *
            FROM TB_MAIL
            WHERE MAIL_ID = ?;
        `;
    const params = [mail_id];
    return await this.mysqlService.query(query, params);
  }

  async findUncheckedMailsByUserId(user_id: number) {
    const query = `
            SELECT
                MAIL_ID,
                TITLE,
                CONTENTS,
                ITEM_ID,
                ITEM_QTY,
                MAIL_CHECKED,
                ITEM_RECEIVED,
                CREATE_DATE
            FROM TB_MAIL
            WHERE USER_ID = ? AND (MAIL_CHECKED = FALSE OR ITEM_RECEIVED = FALSE);
        `;
    const params = [user_id];
    return await this.mysqlService.query(query, params);
  }

  async checkAndReadMailByMailId(user_id: number, mail_id: number) {
    const query1 = `
      UPDATE TB_MAIL
      SET MAIL_CHECKED = 1
      WHERE MAIL_ID = ?;
      `;
    const params = [mail_id];
    await this.mysqlService.query(query1, params);
    const query2 = `
            SELECT
                MAIL_ID,
                TITLE,
                CONTENTS,
                ITEM_ID,
                ITEM_QTY,
                MAIL_CHECKED,
                ITEM_RECEIVED,
                CREATE_DATE
            FROM TB_MAIL
            WHERE MAIL_ID = ?;
        `;
    return await this.mysqlService.query(query2, params);
  }

  async ItemReceivedCheckByMailId(mail_id: number) {
    const query = `
            UPDATE TB_MAIL
            SET ITEM_RECEIVED = 1
            WHERE MAIL_ID = ?;
        `;
    const params = [mail_id];
    return await this.mysqlService.query(query, params);
  }
  async deleteMailByMailId(mail_id: number) {
    const query = `
                UPDATE TB_MAIL
                SET DELETE_DATE = CURRENT_TIMESTAMP
                WHERE MAIL_ID = ?;
            `;
    const params = [mail_id];
    return await this.mysqlService.query(query, params);
  }

  async postMail(
    user_id: number,
    title: string,
    contents: string,
    item_id: number,
    item_qty: number = 1,
  ) {
    let query, params;
    if (item_id) {
      query = `
                INSERT INTO TB_MAIL
                    (USER_ID, TITLE, CONTENTS, ITEM_ID, ITEM_QTY, ITEM_RECEIVED)
                VALUES (?, ?, ?, ?, ?, 0);
            `;
      params = [user_id, title, contents, item_id, item_qty];
    } else {
      query = `
                INSERT INTO TB_MAIL
                    (USER_ID, TITLE, CONTENTS)
                VALUES (?, ?, ?);
            `;
      params = [user_id, title, contents];
    }
    return await this.mysqlService.query(query, params);
  }
  async checkMailByMailId(user_id: number, mail_id: number) {
    const query = `
            UPDATE TB_MAIL
            SET MAIL_CHECKED = 1
            WHERE MAIL_ID = ? AND USER_ID = ?;
        `;
    const params = [mail_id, user_id];
    return await this.mysqlService.query(query, params);
  }
}
