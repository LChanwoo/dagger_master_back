import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/common/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //   @Post('nickname')
  //   async changeNickname(@User() user: any) {
  //     return await this.userService.changeNickname();
  //   }
}
