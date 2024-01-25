import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MysqlService } from 'src/mysql/mysql.service';
import { AuthRepository } from './auth.repository';
import { ItemRepository } from 'src/item/item.repository';
import { UserRepository } from 'src/user/user.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly itemRepository: ItemRepository,
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}
  async validateSuperUser(address: string, password: string): Promise<any> {
    const suId = this.configService.get<string>('SUPER_ADMIN');
    const suPw = this.configService.get<string>('SUPER_ADMIN_PASSWORD');
    if (address === suId && password === suPw) {
      return { email: suId };
    }
    return null;
  }

  // 유저가 존재하는지 확인
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.authRepository.findUserByEmail(email);
    try {
      if (user.length > 0) {
        if (user[0].SUB_ID === password) {
          const { ...result } = user[0];
          return result;
        } else {
          throw new UnauthorizedException('sub_id가 일치하지 않습니다.');
        }
      }
      return null;
    } catch (err) {
      return err.response;
    }
  }
  // 유저 생성
  async createUser(email: string, password: string) {
    const userCount = await this.userRepository.getUserCount();
    const userNickName = '유저00' + userCount[0].USER_COUNT;
    await this.authRepository.createUser(email, password, userNickName);
    const user = await this.authRepository.findUserByEmail(email);
    const user_id = user[0].USER_ID;
    await this.itemRepository.createUserInventory(user_id);
    return user;
  }
  // 로그인 시간 업데이트
  async updateLoginDate(user_id: number) {
    return await this.authRepository.updateLoginDate(user_id);
  }
  // 출석 체크
  async checkAttendance(user_id: number) {
    const attendanceData = await this.authRepository.getAttendanceData(user_id);
    if (attendanceData.length === 0) {
      await this.authRepository.insertAttendanceData(user_id);
      const sevendaysAttendanceData =
        await this.authRepository.select7daysAttendanceData(user_id);
      return {
        attendanceData: sevendaysAttendanceData,
        attendanceCheck: true,
      };
    } else {
      return {
        attendanceCheck: false,
      };
    }
  }
}
