import { Module, forwardRef } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { MysqlModule } from 'src/mysql/mysql.module';
import { ItemRepository } from './item.repository';

@Module({
  imports: [forwardRef(() => MysqlModule)],
  controllers: [ItemController],
  providers: [ItemService, ItemRepository],
  exports: [ItemService, ItemRepository],
})
export class ItemModule {}
