import { Injectable } from '@nestjs/common';
import { MysqlService } from 'src/mysql/mysql.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly mysqlService: MysqlService) {}

  async findUserByEmail(email: string) {
    const query = `
            SELECT * FROM TB_USER WHERE email = ?;
        `;
    const params = [email];
    return await this.mysqlService.query(query, params);
  }

  async createUser(email: string, password: string, nickname: string) {
    const query = `
            INSERT INTO TB_USER (EMAIL, SUB_ID,NICKNAME) VALUES (?, ?, ?);
        `;
    const params = [email, password, nickname];
    return await this.mysqlService.query(query, params);
  }

  async updateLoginDate(user_id: number) {
    const query = `
            UPDATE TB_USER
            SET LAST_LOGIN = NOW()
            WHERE USER_ID = ?;
        `;
    const params = [user_id];
    return await this.mysqlService.query(query, params);
  }
  async getAttendanceData(user_id: number) {
    const query = `
            SELECT *
            FROM TB_ATTENDANCE
            WHERE
                USER_ID = ?
                AND
                DATE_FORMAT(ATT_DATE, '%Y-%m-%d') = DATE_FORMAT(NOW(), '%Y-%m-%d')
            ;
        `;
    const params = [user_id];
    return await this.mysqlService.query(query, params);
  }
  async insertAttendanceData(user_id: number) {
    const query = `
            INSERT INTO TB_ATTENDANCE
                (USER_ID, ATT_DATE)
            VALUES (?, NOW());
        `;
    const params = [user_id];
    return await this.mysqlService.query(query, params);
  }
  async select7daysAttendanceData(user_id: number) {
    const query = `
            SELECT count(*)%8 as COUNT
            FROM TB_ATTENDANCE
            WHERE
                USER_ID = ?
            ;
    
        `;
    const params = [user_id];
    return (await this.mysqlService.query(query, params))[0];
  }
}
