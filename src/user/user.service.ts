import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async changeNickname(user_id: number, nickname: string) {
    return await this.userRepository.changeNickname(user_id, nickname);
  }
}
