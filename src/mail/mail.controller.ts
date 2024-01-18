import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import { User } from 'src/common/decorators/user.decorator';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('mail')
@UseGuards(AuthenticatedGuard)
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async postMail(@User() user: any, @Body() body: any) {
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
  async getMailList(@User() user: any) {
    return await this.mailService.getMailList(user.USER_ID);
  }

  @Get('/:mail_id')
  async checkAndReadMail(@User() user: any, @Param('mail_id') mail_id: number) {
    return await this.mailService.checkAndReadMail(user.USER_ID, mail_id);
  }
  @Get('/:mail_id/item')
  async getMailItem(@User() user: any, @Param('mail_id') mail_id: number) {
    return await this.mailService.getMailItem(user.USER_ID, mail_id);
  }
}
