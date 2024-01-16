import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { MysqlModule } from 'src/mysql/mysql.module';
import { FriendController } from './friend.controller';
import { FriendRepository } from './friend.repository';

@Module({
  imports: [MysqlModule],
  controllers: [FriendController],
  providers: [FriendService, FriendRepository],
})
export class FriendModule {}
