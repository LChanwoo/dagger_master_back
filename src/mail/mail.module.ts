import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailRepository } from './mail.respository';
import { MysqlModule } from 'src/mysql/mysql.module';
import { ItemModule } from 'src/item/item.module';

@Module({
  imports: [MysqlModule, ItemModule],
  controllers: [MailController],
  providers: [MailService, MailRepository],
  exports: [MailService],
})
export class MailModule {}
