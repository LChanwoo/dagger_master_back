import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { User } from 'src/common/decorators/user.decorator';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { PostMailDto } from './dto/postMail.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('mail')
@UseGuards(AuthenticatedGuard)
@UseInterceptors(SuccessInterceptor)
@ApiTags('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  @ApiOperation({ summary: '메일 보내기' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 400, description: 'body 확인 필요' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  async postMail(@User() user: any, @Body() body: PostMailDto) {
    const { user_id, title, contents, item_id, qty } = body;
    return await this.mailService.postMail(
      user_id,
      title,
      contents,
      item_id,
      qty,
    );
  }

  @Get()
  @ApiOperation({ summary: '메일 리스트 조회' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  async getMailList(@User() user: any) {
    return await this.mailService.getMailList(user.USER_ID);
  }

  @Get('/:mail_id')
  @ApiOperation({ summary: '메일 읽기' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  async checkAndReadMail(@User() user: any, @Param('mail_id') mail_id: number) {
    return await this.mailService.checkAndReadMail(user.USER_ID, mail_id);
  }
  @Get('/:mail_id/item')
  @ApiOperation({ summary: '메일 아이템 읽기' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  async getMailItem(@User() user: any, @Param('mail_id') mail_id: number) {
    return await this.mailService.getMailItem(user.USER_ID, mail_id);
  }
  @Get('/all/mails')
  @ApiOperation({ summary: '모든 메일 읽기 & 아이템 수령 & 모든 메일 삭제' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  async getAllMail(@User() user: any) {
    const { USER_ID } = user;
    console.log(USER_ID);
    return await this.mailService.recieveAllMailAndItem(USER_ID);
  }
}
