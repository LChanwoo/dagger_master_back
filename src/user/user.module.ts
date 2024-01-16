import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MysqlModule } from 'src/mysql/mysql.module';
import { UserRepository } from './user.repository';

@Module({
  imports: [MysqlModule],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService, UserRepository],
})
export class UserModule {}
