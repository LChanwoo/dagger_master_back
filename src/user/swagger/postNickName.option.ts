export const POST_NICKNAME_OPTION = {
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
        description: '유저 정보',
        example: {
          message: '닉네임이 변경되었습니다.',
        },
      },
    },
  },
};
