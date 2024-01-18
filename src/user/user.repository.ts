import { Injectable } from '@nestjs/common';
import { MysqlService } from 'src/mysql/mysql.service';

@Injectable()
export class UserRepository {
  constructor(private readonly mysqlService: MysqlService) {}

  async getUserCount() {
    const query = `
            SELECT COUNT(*) AS USER_COUNT FROM TB_USER;
        `;
    return await this.mysqlService.query(query);
  }

  async getAllUser() {
    const query = `
            SELECT * FROM TB_USER;
        `;
    return await this.mysqlService.query(query);
  }

  async createUser(email: string, password: string) {
    const query = `
            INSERT INTO TB_USER
                (EMAIL, SUB_ID)
            VALUES (?, ?);
        `;
    const params = [email, password];
    return await this.mysqlService.query(query, params);
  }
  async changeNickname(user_id: number, nickname: string) {
    const query = `
            UPDATE TB_USER
            SET NICKNAME = ?
            WHERE USER_ID = ?;
        `;
    const params = [nickname, user_id];
    return await this.mysqlService.query(query, params);
  }
}
