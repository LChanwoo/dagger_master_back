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
import { SuperUserAuthGuard } from 'src/auth/auth.su.guard';
import { UNAUTHORIZED_OPTION } from 'src/common/swagger/401.option';
import { INTERNER_SERVER_ERROR_OPTION } from 'src/common/swagger/500.option';
import { POST_MAIL_OPTION } from './swagger/postMail.option';
import { GET_MAIL_LIST_OPTION } from './swagger/getMailList.option';
import { GET_MAIL_BY_MAIL_ID_OPTION } from './swagger/getMailByMailID.option';
import { GET_ALL_MAIL_OPTIONS } from './swagger/getAllMail.option';

@Controller('mail')
@UseInterceptors(SuccessInterceptor)
@ApiTags('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  @UseGuards(SuperUserAuthGuard)
  @ApiOperation({ summary: '메일 보내기' })
  @ApiResponse(POST_MAIL_OPTION)
  @ApiResponse(UNAUTHORIZED_OPTION)
  @ApiResponse(INTERNER_SERVER_ERROR_OPTION)
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
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({ summary: '메일 리스트 조회' })
  @ApiResponse(GET_MAIL_LIST_OPTION)
  @ApiResponse(UNAUTHORIZED_OPTION)
  @ApiResponse(INTERNER_SERVER_ERROR_OPTION)
  async getMailList(@User() user: any) {
    return await this.mailService.getMailList(user.USER_ID);
  }

  @Get('/:mail_id')
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({ summary: '메일 읽기' })
  @ApiResponse(GET_MAIL_BY_MAIL_ID_OPTION)
  @ApiResponse(UNAUTHORIZED_OPTION)
  @ApiResponse(INTERNER_SERVER_ERROR_OPTION)
  async checkAndReadMail(@User() user: any, @Param('mail_id') mail_id: number) {
    return await this.mailService.checkAndReadMail(user.USER_ID, mail_id);
  }
  @Get('/:mail_id/item')
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({ summary: '메일 아이템 읽기' })
  @ApiResponse(GET_MAIL_BY_MAIL_ID_OPTION)
  @ApiResponse(UNAUTHORIZED_OPTION)
  @ApiResponse(INTERNER_SERVER_ERROR_OPTION)
  async getMailItem(@User() user: any, @Param('mail_id') mail_id: number) {
    return await this.mailService.getMailItem(user.USER_ID, mail_id);
  }
  @Get('/all/mails')
  @UseGuards(AuthenticatedGuard)
  @ApiOperation({ summary: '모든 메일 읽기 & 아이템 수령 & 모든 메일 삭제' })
  @ApiResponse(GET_ALL_MAIL_OPTIONS)
  @ApiResponse(UNAUTHORIZED_OPTION)
  @ApiResponse(INTERNER_SERVER_ERROR_OPTION)
  async getAllMail(@User() user: any) {
    const { USER_ID } = user;
    console.log(USER_ID);
    return await this.mailService.recieveAllMailAndItem(USER_ID);
  }
}
