import { Module } from '@nestjs/common';
import { MysqlModule } from 'src/mysql/mysql.module';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { ScoreRepository } from './score.repository';

@Module({
  imports: [MysqlModule],
  controllers: [ScoreController],
  providers: [ScoreService, ScoreRepository],
})
export class ScoreModule {}
