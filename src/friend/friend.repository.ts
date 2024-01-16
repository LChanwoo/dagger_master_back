import { Injectable } from '@nestjs/common';
import { MysqlService } from 'src/mysql/mysql.service';

@Injectable()
export class FriendRepository {
  constructor(private readonly mysqlService: MysqlService) {}

  async findFriendListByUser_id(from_user_id: number, to_user_id: number) {
    const query = `
            SELECT *
            FROM TB_FRIEND_REQUEST
            WHERE FROM_USER = ? AND IS_FRIEND = TRUE
            UNION
            SELECT *
            FROM TB_FRIEND_REQUEST
            WHERE TO_USER = ? AND IS_FRIEND = TRUE;
            ;
        `;
    const params = [from_user_id, to_user_id];
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

  async acceptFriendByUsersId(user_id: number, friend_id: number) {
    const query = `
            UPDATE TB_FRIEND_REQUEST
            SET IS_FRIEND = TRUE,
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
            WHERE FROM_USER = ? AND TO_USER = ?;
        `;
    const params = [user_id, friend_id];
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
