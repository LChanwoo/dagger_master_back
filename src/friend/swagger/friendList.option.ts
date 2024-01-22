export const FRIEND_LIST_SWAGGER_OPTION = {
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
        description: '친구 목록',
        example: [
          {
            friend_user_id: 1,
            EMAIL: 'test13@tmail.com',
            NICKNAME: '유저0013',
          },
          {
            friend_user_id: 2,
            EMAIL: 'test12@tmail.com',
            NICKNAME: '유저0012',
          },
        ],
      },
    },
  },
};
