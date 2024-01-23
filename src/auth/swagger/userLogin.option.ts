export const USER_LOGIN_OPTION = {
  status: 201,
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
        example: 201,
      },
      data: {
        type: 'object',
        description: '유저 정보',
        example: {
          USER_ID: 1,
          EMAIL: 'test13@tmail.com',
          NICKNAME: '유저006',
          LAST_LOGIN: '2024-01-22T13:38:31.000Z',
        },
      },
    },
  },
};
