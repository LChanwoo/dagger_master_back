export const GET_USER_INVENTORY_OPTION = {
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
        description: '인벤토리',
        example: [
          {
            ITEM_ID: 1,
            ITEM_NAME: 'GOLD',
            ITEM_TYPE: 'GOLD',
            ITEM_DESCRIPTION: 'GOLD',
            QTY: 0,
          },
          {
            ITEM_ID: 2,
            ITEM_NAME: '황금망치',
            ITEM_TYPE: 'SKIN',
            ITEM_DESCRIPTION: '황금망치 스킨입니다.',
            QTY: 0,
          },
        ],
      },
    },
  },
};
