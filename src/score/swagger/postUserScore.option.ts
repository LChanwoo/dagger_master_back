export const POST_USER_SCORE_OPTION = {
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
        description: '점수 등록',
        example: {
          message: '점수가 등록되었습니다.',
          added_gold: 100,
        },
      },
    },
  },
};
