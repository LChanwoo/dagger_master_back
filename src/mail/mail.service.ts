import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { MailRepository } from './mail.respository';
import { ItemRepository } from 'src/item/item.repository';
import { ItemService } from 'src/item/item.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailRepository: MailRepository,
    private readonly itemRepository: ItemRepository,
    private readonly itemService: ItemService,
  ) {}

  async getMailList(user_id: number) {
    return await this.mailRepository.findUncheckedMailsByUserId(user_id);
  }

  async checkAndReadMail(user_id: number, mail_id: number) {
    const mail = await this.mailRepository.checkAndReadMailByMailId(
      user_id,
      mail_id,
    );
    if (mail.length === 0) {
      return { message: '해당 메일을 읽을 수 없습니다.' };
    }
    return mail;
  }
  async getMailItem(user_id: number, mail_id: number) {
    //메일을 읽을 권한이 있는지 확인
    const mail = await this.mailRepository.checkAndReadMailByMailId(
      user_id,
      mail_id,
    );
    //메일이 없으면 에러
    if (mail.length === 0) {
      throw new ForbiddenException('해당 메일을 읽을 수 없습니다.');
    }
    //메일이 이미 읽었으면 에러
    if (mail[0].ITEM_RECEIVED === 1) {
      return { message: '이미 아이템을 수령했습니다.' };
    }
    const { ITEM_ID, ITEM_QTY } = mail[0];
    //메일에 아이템이 없으면 에러
    if (ITEM_ID === null) {
      throw new BadRequestException('아이템이 없습니다.');
    }
    //유저 인벤토리 확인
    const userInventory = await this.itemRepository.getUserInventory(user_id);
    //유저 인벤토리가 없으면 생성
    if (userInventory.length === 0) {
      await this.itemRepository.createUserInventory(user_id);
    }
    //유저 인벤토리에 아이템이 있는지 확인
    const check = this.itemService.findItemById(userInventory, ITEM_ID);

    //유저 인벤토리에 아이템이 없으면 추가
    if (!check) {
      await this.itemRepository.addNotHaveItemToInventoryByItemId(
        user_id,
        ITEM_ID,
      );
    }
    //유저 인벤토리에 아이템이 있으면 수량 추가
    await this.itemRepository.addItemInInventoryByItemId(
      user_id,
      ITEM_ID,
      ITEM_QTY,
    );
    //메일 아이템 수령 처리
    await this.mailRepository.ItemReceivedCheckByMailId(mail_id);

    return { message: '아이템을 수령했습니다.' };
  }

  async postMail(
    user_id: number,
    title: string,
    contents: string,
    item_id: number,
    item_qty: number,
  ) {
    //메일 제목, 내용 길이 확인
    if (title.length > 20) {
      throw new BadRequestException({
        message: '제목은 20자 이하로 작성해주세요.',
      });
    }
    if (contents.length > 50) {
      throw new BadRequestException({
        message: '내용은 50자 이하로 작성해주세요.',
      });
    }

    try {
      await this.mailRepository.postMail(
        user_id,
        title,
        contents,
        item_id,
        item_qty,
      );
    } catch (err) {
      return { message: '메일을 보내는데 실패했습니다.' };
    }
    return { message: '메일을 보냈습니다.' };
  }
  async recieveAllMailAndItem(user_id: number) {
    //메일함에 있는 메일들을 모두 가져옴
    const mailList = await this.mailRepository.findUncheckedMailsByUserId(
      user_id,
    );
    //메일함에 메일이 없으면 에러
    if (mailList.length === 0) {
      return { message: '메일함에 메일이 없습니다.' };
    }
    //유저 인벤토리 확인
    const userInventory = await this.itemRepository.getUserInventory(user_id);
    //유저 인벤토리가 없으면 생성
    if (userInventory.length === 0) {
      await this.itemRepository.createUserInventory(user_id);
    }
    //메일함에 메일이 있으면 메일 아이템을 수령
    for (const mail of mailList) {
      const { MAIL_ID, ITEM_ID, ITEM_QTY } = mail;
      //메일에 아이템이 없으면 다음 메일로
      await this.mailRepository.checkMailByMailId(user_id, MAIL_ID);
      if (ITEM_ID === null) {
        continue;
      }
      console.log(userInventory);
      //유저 인벤토리에 아이템이 있는지 확인
      const check = this.itemService.findItemById(userInventory, ITEM_ID);

      //유저 인벤토리에 아이템이 없으면 추가
      if (!check) {
        await this.itemRepository.addNotHaveItemToInventoryByItemId(
          user_id,
          ITEM_ID,
        );
      }
      //유저 인벤토리에 아이템이 있으면 수량 추가
      await this.itemRepository.addItemInInventoryByItemId(
        user_id,
        ITEM_ID,
        ITEM_QTY,
      );
      //메일 아이템 수령 처리
      await this.mailRepository.ItemReceivedCheckByMailId(MAIL_ID);
    }
    return { message: '모든 메일을 수령했습니다.' };
  }
}
