import { Injectable } from '@nestjs/common';
import { ScoreRepository } from './score.repository';

@Injectable()
export class ScoreService {
  constructor(private readonly scoreRepository: ScoreRepository) {}

  async getScoreList() {
    return await this.scoreRepository.getScoreList();
  }

  async getMaxScoreByUserId(user_id: number) {
    return await this.scoreRepository.getMaxScoreByUserId(user_id);
  }

  async createScoreByUserId(user_id: number, score: number) {
    return await this.scoreRepository.createScoreByUserId(user_id, score);
  }
}
