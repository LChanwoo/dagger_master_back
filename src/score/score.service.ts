import { Injectable } from '@nestjs/common';
import { ScoreRepository } from './score.repository';
import { ItemRepository } from 'src/item/item.repository';

@Injectable()
export class ScoreService {
  constructor(
    private readonly scoreRepository: ScoreRepository,
    private readonly itemRepository: ItemRepository,
  ) {}

  async getScoreList() {
    return await this.scoreRepository.getScoreList();
  }

  async getMaxScoreByUserId(user_id: number) {
    return await this.scoreRepository.getMaxScoreByUserId(user_id);
  }

  async getScoreListWithUser(user_id: number) {
    const ranking = await this.scoreRepository.getScoreListWithUser(user_id);
    return ranking.slice(0, 101);
  }

  async createScoreByUserId(user_id: number, score: number) {
    try {
      await this.scoreRepository.createScoreByUserId(user_id, score);
      await this.itemRepository.addPlayerGoldByUserId(user_id, score);
      return {
        message: '점수가 등록되었습니다.',
        added_gold: score,
      };
    } catch (e) {
      console.log(e);
    }
  }
}
