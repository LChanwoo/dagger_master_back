import e from 'express';

export const FRIEND_ACCEPT_OPTION = {
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
          message: '친구 요청을 수락했습니다.',
        },
      },
    },
  },
};

export const FRIEND_ACCEPT_ERROR_OPTION = {
  status: 400,
  description: '실패',
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
      error: {
        type: 'object',
        description: '에러 메세지',
        example: {
          message: '친구 요청 리스트를 불러오는데 실패했습니다.',
        },
      },
    },
  },
};
