import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { MysqlModule } from 'src/mysql/mysql.module';
import { ShopRepository } from './shop.repository';
import { ItemModule } from 'src/item/item.module';

@Module({
  imports: [MysqlModule, ItemModule],
  providers: [ShopService, ShopRepository],
  controllers: [ShopController],
})
export class ShopModule {}
