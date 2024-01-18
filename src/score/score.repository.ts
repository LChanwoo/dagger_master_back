import { Injectable } from '@nestjs/common';
import { MysqlService } from 'src/mysql/mysql.service';

@Injectable()
export class ScoreRepository {
  constructor(private readonly mysqlService: MysqlService) {}

  async getScoreList() {
    const query = `
            SELECT
                B.EMAIL,
                B.NICKNAME,
                MAX(A.SCORE) AS SCORE,
                (DENSE_RANK() OVER (ORDER BY MAX(A.SCORE) DESC)) AS RANKING,
                MAX(A.PLAY_DATE) AS PLAY_DATE
            FROM TB_RESULT A
                INNER JOIN TB_USER B
                ON A.USER_ID = B.USER_ID
            GROUP BY A.USER_ID
            ORDER BY MAX(A.SCORE) DESC
            ;
        `;
    return await this.mysqlService.query(query);
  }
  //작성중
  async getScoreListWithUser(user_id: number) {
    const query = `
            (SELECT
                B.EMAIL,
                B.NICKNAME,
                MAX(SCORE) AS SCORE
            FROM TB_RESULT A
                INNER JOIN TB_USER B
                ON A.USER_ID = B.USER_ID
            GROUP BY A.USER_ID
            ORDER BY MAX(SCORE) DESC
            LIMIT 100)
            UNION
            (SELECT
                B.EMAIL,
                B.NICKNAME,
                MAX(SCORE) AS SCORE
            FROM TB_RESULT A
                INNER JOIN TB_USER B
                ON A.USER_ID = B.USER_ID
            WHERE A.USER_ID = ?
            GROUP BY A.USER_ID);
        `;
    const params = [user_id];
    return await this.mysqlService.query(query, params);
  }

  async getMaxScoreByUserId(user_id: number) {
    const query = `
            SELECT
                A.USER_ID,
                B.EMAIL,
                B.NICKNAME,
                MAX(SCORE) AS SCORE,
            FROM TB_RESULT A
                INNER JOIN TB_USER B
                ON A.USER_ID = B.USER_ID
            WHERE A.USER_ID = ?
            GROUP BY A.USER_ID;
        `;
    const params = [user_id];
    return await this.mysqlService.query(query, params);
  }

  async createScoreByUserId(user_id: number, score: number) {
    const query = `
            INSERT INTO
                TB_RESULT
                (USER_ID, SCORE)
            VALUES (?,?);
        `;
    const params = [user_id, score];
    return await this.mysqlService.query(query, params);
  }
}
