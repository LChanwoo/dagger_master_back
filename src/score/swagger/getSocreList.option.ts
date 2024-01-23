export const GET_SCORE_LIST_OPTION = {
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
        type: 'array',
        description: '점수 리스트',
        example: [
          {
            EMAIL: 'test12305@test.com',
            NICKNAME: '유저000',
            SCORE: 8000,
            RANKING: 1,
            PLAY_DATE: '2024-01-22T06:49:44.000Z',
          },
          {
            EMAIL: 'test12301@test.com',
            NICKNAME: '유저001',
            SCORE: 7000,
            RANKING: 2,
            PLAY_DATE: '2024-01-20T05:27:50.000Z',
          },
          {
            EMAIL: 'test12302@test.com',
            NICKNAME: '유저002',
            SCORE: 6000,
            RANKING: 3,
            PLAY_DATE: '2024-01-20T05:28:09.000Z',
          },
          {
            EMAIL: 'test12303@test.com',
            NICKNAME: '유저003',
            SCORE: 5000,
            RANKING: 4,
            PLAY_DATE: '2024-01-20T05:28:24.000Z',
          },
          {
            EMAIL: 'test12304@test.com',
            NICKNAME: '유저004',
            SCORE: 4000,
            RANKING: 5,
            PLAY_DATE: '2024-01-20T05:28:41.000Z',
          },
        ],
      },
    },
  },
};
