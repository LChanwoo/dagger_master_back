import { Injectable } from '@nestjs/common';
import { MysqlService } from 'src/mysql/mysql.service';

@Injectable()
export class MailRepository {
  constructor(private readonly mysqlService: MysqlService) {}

  async findMailByUserId(user_id: number) {
    const query = `
            SELECT *
            FROM TB_MAIL
            WHERE USER_ID = ?;
        `;
    const params = [user_id];
    return await this.mysqlService.query(query, params);
  }

  async findUncheckedMailByUserId(user_id: number) {
    const query = `
            SELECT *
            FROM TB_MAIL
            WHERE USER_ID = ? AND (MAIL_CHECKED = FALSE OR MAIL_CHECKED IS NULL);
        `;
    const params = [user_id];
    return await this.mysqlService.query(query, params);
  }

  async checkMailByMailId(mail_id: number) {
    const query = `
            UPDATE TB_MAIL
            SET MAIL_CHECKED = TRUE
            WHERE MAIL_ID = ?;
        `;
    const params = [mail_id];
    return await this.mysqlService.query(query, params);
  }
  // 작성중
  async ItemReceivedCheckByMailId(mail_id: number) {
    const query = `
            UPDATE TB_MAIL
            SET ITEM_RECEIVED = TRUE
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
}
