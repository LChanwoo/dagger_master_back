import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MysqlModule } from './mysql/mysql.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FriendModule } from './friend/friend.module';
import { ScoreModule } from './score/score.module';
import { ItemModule } from './item/item.module';
import { MailModule } from './mail/mail.module';
import { RedisModule } from './redis/redis.module';
import { ShopModule } from './shop/shop.module';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MysqlModule,
    AuthModule,
    UserModule,
    FriendModule,
    ScoreModule,
    ItemModule,
    MailModule,
    RedisModule,
    ShopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
