import { Injectable } from '@nestjs/common';
import { FriendRepository } from './friend.repository';

@Injectable()
export class FriendService {
  constructor(private readonly friendRepository: FriendRepository) {}

  async findFriendListByUser_id(user_id: number) {
    return await this.friendRepository.findFriendListByUserId(user_id);
  }
  async requestFriend(user_id: number, friend_id: number) {
    //이미 친구 요청을 보냈는지 확인
    const alreadyRequested = await this.friendRepository.findFriendRequset(
      user_id,
      friend_id,
    );
    //이미 친구 요청을 보냈으면 에러
    if (alreadyRequested.length > 0) {
      return { message: '이미 친구 요청을 보냈습니다.' };
    }
    //친구 요청 보내기
    await this.friendRepository.requestFriend(user_id, friend_id);
    return { message: '친구 요청을 보냈습니다.' };
  }

  async findFriendRequestListByUser_id(user_id: number) {
    return await this.friendRepository.findFriendRequestListByUser_id(user_id);
  }
  //친구 요청 수락
  async acceptFriendByUsersId(user_id: number, friend_id: number) {
    try {
      //이미 친구 요청을 보냈는지 확인
      const alreadyRequested = await this.friendRepository.findFriendRequset(
        user_id,
        friend_id,
      );
      //친구 요청을 보내지 않았으면 에러
      if (alreadyRequested.length === 0) {
        return { message: '친구 요청을 먼저 보내주세요.' };
      }

      await this.friendRepository.acceptFriendByUsersId(user_id, friend_id);
      return { message: '친구 요청을 수락했습니다.' };
    } catch (err) {
      console.log(err);
      return { message: '친구 요청 수락에 실패했습니다.' };
    }
  }

  // 다른 유저가 보낸 친구 요청 리스트
  async findrequestFriendListByOthersByUserID(user_id: number) {
    try {
      return await this.friendRepository.findrequestFriendListByOthersByUserID(
        user_id,
      );
    } catch (err) {
      return { message: '친구 요청 리스트를 불러오는데 실패했습니다.' };
    }
  }

  // 랜덤 친구 리스트
  async findRandomFriendList(user_id: number) {
    try {
      return await this.friendRepository.findRandomFriendList(user_id);
    } catch (err) {
      return { message: '추천 친구 리스트를 불러오는데 실패했습니다.' };
    }
  }

  //친구 요청 거절 또는 친구 삭제
  async deleteFriend(user_id: number, friend_id: number) {
    try {
      //이미 친구 요청을 보냈는지 확인
      const alreadyRequested = await this.friendRepository.findFriendRequset(
        user_id,
        friend_id,
      );
      //친구 요청을 보내지 않았으면 에러
      if (alreadyRequested && alreadyRequested.length === 0) {
        return { message: '친구 요청을 먼저 보내주세요.' };
      }
      //친구 요청 삭제 또는 친구 삭제
      await this.friendRepository.deleteFriendByUserId(user_id, friend_id);
      return { message: '친구를 삭제했습니다.' };
    } catch (err) {
      console.log(err);
      return { message: '친구 삭제에 실패했습니다.' };
    }
  }
}
