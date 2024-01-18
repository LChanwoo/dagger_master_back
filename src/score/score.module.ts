import { Module } from '@nestjs/common';
import { MysqlModule } from 'src/mysql/mysql.module';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { ScoreRepository } from './score.repository';
import { ItemModule } from 'src/item/item.module';

@Module({
  imports: [MysqlModule, ItemModule],
  controllers: [ScoreController],
  providers: [ScoreService, ScoreRepository],
})
export class ScoreModule {}
