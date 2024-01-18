import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { MysqlModule } from 'src/mysql/mysql.module';

@Module({
  imports: [MysqlModule],
  providers: [ShopService],
  controllers: [ShopController],
})
export class ShopModule {}
