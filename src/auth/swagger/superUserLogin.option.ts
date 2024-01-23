export const SUPER_USER_LOGIN_OPTION = {
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
        description: '유저 데이터',
        example: {
          email: 'superadmin',
        },
      },
    },
  },
};
