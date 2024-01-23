export const GET_USER_MAX_SCORE_OPTION = {
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
        description: '최고점수',
        example: {
          USER_ID: 9,
          EMAIL: 'test13@tmail.com',
          NICKNAME: '유저006',
          SCORE: 100,
        },
      },
    },
  },
};
