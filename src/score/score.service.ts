import { Injectable, Logger } from '@nestjs/common';
import { ScoreRepository } from './score.repository';
import { ItemRepository } from 'src/item/item.repository';

@Injectable()
export class ScoreService {
  constructor(
    private readonly scoreRepository: ScoreRepository,
    private readonly itemRepository: ItemRepository,
  ) {}
  private readonly logger = new Logger(ScoreService.name);
  async getScoreList() {
    return await this.scoreRepository.getScoreList();
  }
  // 유저 아이디로 최고 점수 가져오기
  async getMaxScoreByUserId(user_id: number) {
    return await this.scoreRepository.getMaxScoreByUserId(user_id);
  }

  // 유저 아이디로 점수 리스트 가져오기
  async getScoreListWithUser(user_id: number) {
    // 유저 아이디로 점수 리스트 가져오기
    const ranking = await this.scoreRepository.getScoreListWithUser(user_id);
    // 랭킹 100위까지 가져오기
    const ranking_board = ranking.slice(0, 101);
    // 유저 아이디로 유저 랭킹 가져오기
    const user_ranking = ranking.find((user) => user.USER_ID === user_id);
    return {
      ranking_board,
      user_ranking,
    };
  }

  // 유저 아이디로 점수 등록하기
  async createScoreByUserId(user_id: number, score: number) {
    try {
      console.log(user_id, score);
      // 점수 등록
      await this.scoreRepository.createScoreByUserId(user_id, score);
      // 골드 보상 지급
      await this.itemRepository.addPlayerGoldByUserId(user_id, score);
      this.logger.log(`유저 아이디 ${user_id}에게 ${score}골드 지급`);
      return {
        message: '점수가 등록되었습니다.',
        added_gold: score,
      };
    } catch (e) {
      console.log(e);
    }
  }
}
