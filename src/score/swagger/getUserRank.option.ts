export const GET_USER_RANK_OPTION = {
  status: 200,
  description: '성공',
  schema: {
    properties: {
      success: {
        type: 'boolean',
        description: '성공 여부',
        example: true,
      },
      status: {
        type: 'number',
        description: '상태 코드',
        example: 200,
      },
      data: {
        type: 'object',
        description: '유저 랭킹 조회',
        example: {
          ranking_board: [
            {
              RANKING: 1,
              USER_ID: 1,
              EMAIL: 'test12305@test.com',
              NICKNAME: '유저000',
              SCORE: 8000,
              PLAY_DATE: '2024-01-22T06:49:44.000Z',
            },
            {
              RANKING: 2,
              USER_ID: 2,
              EMAIL: 'test12301@test.com',
              NICKNAME: '유저001',
              SCORE: 7000,
              PLAY_DATE: '2024-01-20T05:27:50.000Z',
            },
            {
              RANKING: 3,
              USER_ID: 3,
              EMAIL: 'test12302@test.com',
              NICKNAME: '유저002',
              SCORE: 6000,
              PLAY_DATE: '2024-01-20T05:28:09.000Z',
            },
            {
              RANKING: 4,
              USER_ID: 4,
              EMAIL: 'test12303@test.com',
              NICKNAME: '유저003',
              SCORE: 5000,
              PLAY_DATE: '2024-01-20T05:28:24.000Z',
            },
            {
              RANKING: 5,
              USER_ID: 5,
              EMAIL: 'test12304@test.com',
              NICKNAME: '유저004',
              SCORE: 4000,
              PLAY_DATE: '2024-01-20T05:28:41.000Z',
            },
            {
              RANKING: 6,
              USER_ID: 9,
              EMAIL: 'test13@tmail.com',
              NICKNAME: '유저006',
              SCORE: 100,
              PLAY_DATE: '2024-01-23T05:14:37.000Z',
            },
          ],
          user_ranking: {
            RANKING: 6,
            USER_ID: 9,
            EMAIL: 'test13@tmail.com',
            NICKNAME: '유저006',
            SCORE: 100,
            PLAY_DATE: '2024-01-23T05:14:37.000Z',
          },
        },
      },
    },
  },
};
