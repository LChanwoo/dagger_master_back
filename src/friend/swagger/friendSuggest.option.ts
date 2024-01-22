export const FRINED_SUGGEST_OPTION = {
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
        description: '추천 친구 목록',
        example: [
          {
            USER_ID: 10,
            EMAIL: 'test12306@test.com',
            NICKNAME: '유저007',
            LAST_LOGIN: '2024-01-22T07:43:21.000Z',
          },
          {
            USER_ID: 8,
            EMAIL: 'test12@tmail.com',
            NICKNAME: '유저005',
            LAST_LOGIN: '2024-01-22T06:54:05.000Z',
          },
          {
            USER_ID: 3,
            EMAIL: 'test12302@test.com',
            NICKNAME: '유저002',
            LAST_LOGIN: '2024-01-20T05:28:00.000Z',
          },
          {
            USER_ID: 4,
            EMAIL: 'test12303@test.com',
            NICKNAME: '유저003',
            LAST_LOGIN: '2024-01-20T05:28:17.000Z',
          },
          {
            USER_ID: 2,
            EMAIL: 'test12301@test.com',
            NICKNAME: '유저001',
            LAST_LOGIN: '2024-01-20T05:27:44.000Z',
          },
          {
            USER_ID: 5,
            EMAIL: 'test12304@test.com',
            NICKNAME: '유저004',
            LAST_LOGIN: '2024-01-22T06:48:48.000Z',
          },
        ],
      },
    },
  },
};
