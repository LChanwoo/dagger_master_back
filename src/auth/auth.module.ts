import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MysqlModule } from 'src/mysql/mysql.module';
import { AuthRepository } from './auth.repository';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth.strategy';
import { SessionSerializer } from './session.serializer';
import { ItemModule } from 'src/item/item.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    MysqlModule,
    forwardRef(() => ItemModule),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, SessionSerializer, LocalStrategy],
})
export class AuthModule {}
