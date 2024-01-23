export const BUY_SHOP_ITEM_OPTION = {
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
        description: '샵 아이템',
        example: {
          message: 'success',
          requested: {
            shop_id: 1,
            item_id: 2,
            item_name: '황금망치',
            price: 10000,
          },
        },
      },
    },
  },
};
