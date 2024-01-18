import { Injectable } from '@nestjs/common';
import { MysqlService } from 'src/mysql/mysql.service';

@Injectable()
export class FriendRepository {
  constructor(private readonly mysqlService: MysqlService) {}

  async findFriendListByUserId(user_id: number) {
    const query = `
            SELECT CASE
                WHEN FROM_USER = ? THEN TO_USER
                WHEN TO_USER = ? THEN FROM_USER
                END AS friend_user_id,
                B.EMAIL,
                B.NICKNAME
            FROM TB_FRIEND_REQUEST A
                INNER JOIN TB_USER B
                ON A.FROM_USER = B.USER_ID
            WHERE (FROM_USER = ? OR TO_USER = ?)
            AND IS_FRIEND = TRUE;
              ;
          `;
    const params = [user_id, user_id, user_id, user_id];
    return await this.mysqlService.query(query, params);
  }
  async findRandomFriendList(user_id: number) {
    const query = `
            SELECT USER_ID, EMAIL, NICKNAME,LAST_LOGIN
            FROM TB_USER
            WHERE USER_ID NOT IN (SELECT CASE
                    WHEN FROM_USER = ? THEN TO_USER
                    WHEN TO_USER = ? THEN FROM_USER
                    END AS friend_user_id
                FROM TB_FRIEND_REQUEST
                WHERE (FROM_USER = ? OR TO_USER = ?)
                AND IS_FRIEND = TRUE)
            AND USER_ID != ?
            ORDER BY RAND()
            LIMIT 10;
        `;
    const params = [user_id, user_id, user_id, user_id, user_id];
    return await this.mysqlService.query(query, params);
  }
  async findFriendRequset(user_id: number, friend_id: number) {
    const query = `
            (SELECT *
            FROM TB_FRIEND_REQUEST
            WHERE FROM_USER = ? AND TO_USER = ? AND IS_FRIEND = FALSE)
            UNION
            (SELECT *
            FROM TB_FRIEND_REQUEST
            WHERE FROM_USER = ? AND TO_USER = ? AND IS_FRIEND = FALSE)
            ;
        `;
    const params = [user_id, friend_id, friend_id, user_id];
    return await this.mysqlService.query(query, params);
  }
  async findFriendRequestListByUser_id(user_id: number) {
    const query = `
            SELECT *
            FROM TB_FRIEND_REQUEST
            WHERE TO_USER = ? AND IS_FRIEND = FALSE;
            ;
        `;
    const params = [user_id];
    return await this.mysqlService.query(query, params);
  }

  async requestFriend(user_id: number, friend_id: number) {
    const query = `
            INSERT INTO TB_FRIEND_REQUEST
                (FROM_USER, TO_USER)
            VALUES (?, ?);
        `;
    const params = [user_id, friend_id];
    return await this.mysqlService.query(query, params);
  }
  async findrequestFriendListByOthersByUserID(user_id: number) {
    const query = `
            SELECT
                A.FRIEND_REQUEST_ID,
                A.FROM_USER,
                B.EMAIL,
                B.NICKNAME
            FROM TB_FRIEND_REQUEST A
                INNER JOIN TB_USER B
                ON A.FROM_USER = B.USER_ID
            WHERE TO_USER = ? AND IS_FRIEND = FALSE;
        `;
    const params = [user_id];
    return await this.mysqlService.query(query, params);
  }

  async acceptFriendByUsersId(user_id: number, friend_id: number) {
    const query = `
            UPDATE TB_FRIEND_REQUEST
            SET IS_FRIEND = 1,
                COMPLY_DATE = CURRENT_TIMESTAMP
            WHERE FROM_USER = ? AND TO_USER = ?;
        `;
    const params = [user_id, friend_id];
    return await this.mysqlService.query(query, params);
  }

  async acceptFriendByRequestId(request_id: number) {
    const query = `
            UPDATE TB_FRIEND_REQUEST
            SET IS_FRIEND = TRUE,
                COMPLY_DATE = CURRENT_TIMESTAMP
            WHERE FRIEND_REQUEST_ID = ?;
        `;
    const params = [request_id];
    return await this.mysqlService.query(query, params);
  }

  async deleteFriendByUserId(user_id: number, friend_id: number) {
    const query = `
            DELETE FROM TB_FRIEND_REQUEST
            WHERE (FROM_USER = ? AND TO_USER = ?)
            OR (FROM_USER = ? AND TO_USER = ?);
        `;
    const params = [user_id, friend_id, friend_id, user_id];
    return await this.mysqlService.query(query, params);
  }
  async deleteFriendByFriendRequestId(friend_request_id: number) {
    const query = `
            DELETE FROM TB_FRIEND_REQUEST
            WHERE FRIEND_REQUEST_ID = ?;
        `;
    const params = [friend_request_id];
    return await this.mysqlService.query(query, params);
  }
}
