export const SHOP_LIST_OPTION = {
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
        description: '메일',
        example: [
          {
            SHOP_ID: 1,
            SHOP_ITEM_ID: 2,
            SHOP_ITEM_PRICE: 10000,
            SALES_START_DATE: '2023-12-31T15:00:00.000Z',
            SALES_END_DATE: '2024-03-31T15:00:00.000Z',
            ITEM_NAME: '황금망치',
            IS_HAVE: 0,
          },
          {
            SHOP_ID: 2,
            SHOP_ITEM_ID: 2,
            SHOP_ITEM_PRICE: 9000,
            SALES_START_DATE: '2023-12-31T15:00:00.000Z',
            SALES_END_DATE: '2024-03-31T15:00:00.000Z',
            ITEM_NAME: '황금망치',
            IS_HAVE: 0,
          },
        ],
      },
    },
  },
};
