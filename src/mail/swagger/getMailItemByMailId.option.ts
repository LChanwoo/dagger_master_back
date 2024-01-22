export const GET_MAIL_ITEM_BY_MAIL_ID_OPTION = {
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
        description: '메일 아이템',
        example: { message: '아이템을 수령했습니다.' },
      },
    },
  },
};
