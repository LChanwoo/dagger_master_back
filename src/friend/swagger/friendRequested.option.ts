export const FRIEND_REQUESTED_OPTION = {
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
        description: '친구 요청 받은 목록',
        example: [
          {
            FRIEND_REQUEST_ID: 4,
            FROM_USER: 10,
            EMAIL: 'test12306@test.com',
            NICKNAME: '유저007',
          },
        ],
      },
    },
  },
};
