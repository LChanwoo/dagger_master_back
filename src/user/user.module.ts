import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MysqlModule } from 'src/mysql/mysql.module';
import { UserRepository } from './user.repository';
import { ItemModule } from 'src/item/item.module';

@Module({
  imports: [MysqlModule, ItemModule],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService, UserRepository],
})
export class UserModule {}
