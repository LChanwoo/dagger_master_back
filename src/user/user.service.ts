import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async changeNickname(user_id: number, nickname: string) {
    try {
      await this.userRepository.changeNickname(user_id, nickname);
      return {
        message: '닉네임이 변경되었습니다.',
      };
    } catch (e) {
      console.log(e);
    }
  }

  async getAllUser() {
    return await this.userRepository.getAllUser();
  }
}
