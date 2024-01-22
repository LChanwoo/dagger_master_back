import { response } from 'express';
import { FriendDto } from './friend.dto';

export class ResponseFriendListDto {
  success: boolean;
  statusCode: number;
  data: FriendDto[];
}
