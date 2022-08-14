import { LoadMessages } from './../../store/actions/messages';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NewBotPopUp } from '../../compoents/popup/new-bot/new-bot.popup';
import { State } from '../../store';
import { LoadBots, Bots } from '../../store/actions/bots';
import { BotService } from '../../services/bot.service';
import { UpdateBotPopUp } from '../../compoents/popup/update-bot/update-bot.popup';
import { BotFields, MessageFields } from '../../types/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Messages } from '../../store/actions/messages';
import { MessageService } from '../../services/message.service';
import { NewMessagePopUp } from '../../compoents/popup/new-message/new-message.popup';
import { UpdateMessagePopUp } from '../../compoents/popup/update-message/update-message.popup';
import { selectBot } from '../../store/index';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  public messages: Observable<Messages[]> = this.store.select((state) => state.messages.messages)
  public bot: BotFields | undefined;
  public displayedColumns: string[] = ['name','message_url','date','update','delete','link'];
  public bot_id: number = 0


  constructor(
    public dialog: MatDialog,
    private store: Store<State>,
    private message: MessageService,
    private activateRoute: ActivatedRoute,
    private location: Location
    ) {}

  back() {
    this.location.back()
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(params=> {
      this.bot_id = params['id']
      this.store.dispatch(new LoadMessages(params['id']))
    });
  }

  openDialog(): void {
    this.dialog.open(NewMessagePopUp, {
      data: { bot_id: this.bot_id},
      width: '550px',
    });
  }

  delete(id: number) {
    this.message.delete(id).subscribe((data) => {
      this.store.dispatch(new LoadMessages(this.bot_id))
    })
  }

  updateDialog(data: MessageFields): void {
    this.dialog.open(UpdateMessagePopUp, {
      data: data,
      width: '550px',
    });
  }
}
