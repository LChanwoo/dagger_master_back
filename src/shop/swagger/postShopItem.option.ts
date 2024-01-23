export const POST_SHOP_ITEM_OPTION = {
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
            item_id: 1,
            price: 10000,
            start_date: '2024-01-01',
            end_date: '2025-01-01',
          },
        },
      },
    },
  },
};
