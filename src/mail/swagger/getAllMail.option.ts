export const GET_ALL_MAIL_OPTIONS = {
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
        description: '메시지',
        example: { message: '모든 메일을 수령했습니다.' },
      },
    },
  },
};
