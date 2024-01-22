export const FRINED_DELETE_OPTION1 = {
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
        description: '메세지',
        example: {
          message: '친구 삭제를 완료했습니다.',
        },
      },
    },
  },
};

export const FRINED_DELETE_OPTION2 = {
  status: 400,
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
        example: 400,
      },
      data: {
        type: 'object',
        description: '메세지',
        example: {
          message: '친구 요청을 먼저 보내주세요.',
        },
      },
    },
  },
};
