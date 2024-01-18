import { Injectable } from '@nestjs/common';
import { FriendRepository } from './friend.repository';

@Injectable()
export class FriendService {
  constructor(private readonly friendRepository: FriendRepository) {}

  async findFriendListByUser_id(user_id: number) {
    return await this.friendRepository.findFriendListByUserId(user_id);
  }
  async requestFriend(user_id: number, friend_id: number) {
    const alreadyRequested = await this.friendRepository.findFriendRequset(
      user_id,
      friend_id,
    );
    if (alreadyRequested.length > 0) {
      return { message: '이미 친구 요청을 보냈습니다.' };
    }
    await this.friendRepository.requestFriend(user_id, friend_id);
    return true;
  }
  async findFriendRequestListByUser_id(user_id: number) {
    return await this.friendRepository.findFriendRequestListByUser_id(user_id);
  }
  async acceptFriendByUsersId(user_id: number, friend_id: number) {
    const alreadyRequested = await this.friendRepository.findFriendRequset(
      user_id,
      friend_id,
    );
    if (alreadyRequested.length === 0) {
      return { message: '친구 요청을 먼저 보내주세요.' };
    }
    await this.friendRepository.acceptFriendByUsersId(user_id, friend_id);
    return true;
  }
  async findrequestFriendListByOthersByUserID(user_id: number) {
    return await this.friendRepository.findrequestFriendListByOthersByUserID(
      user_id,
    );
  }

  async findRandomFriendList(user_id: number) {
    return await this.friendRepository.findRandomFriendList(user_id);
  }

  async deleteFriend(user_id: number, friend_id: number) {
    const alreadyRequested = await this.friendRepository.findFriendRequset(
      user_id,
      friend_id,
    );
    if (alreadyRequested.length === 0) {
      return { message: '친구 요청을 먼저 보내주세요.' };
    }
    await this.friendRepository.deleteFriendByUserId(user_id, friend_id);
    return true;
  }
}
