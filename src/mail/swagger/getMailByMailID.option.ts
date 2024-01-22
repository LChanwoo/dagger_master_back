export const GET_MAIL_BY_MAIL_ID_OPTION = {
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
        description: '메일',
        example: {
          MAIL_ID: 7,
          TITLE: '테스트메일2',
          CONTENTS: '골드를 받아',
          ITEM_ID: 1,
          ITEM_QTY: 40,
          MAIL_CHECKED: 0,
          ITEM_RECEIVED: 0,
          CREATE_DATE: '2024-01-22T13:50:57.000Z',
        },
      },
    },
  },
};
