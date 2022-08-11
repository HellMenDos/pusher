import { Component, Inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { BotService } from "src/app/services/bot.service";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BotFields, MessageFields } from '../../../types/common';
import { Store } from "@ngrx/store";
import { State } from "src/app/store";
import { LoadBots } from '../../../store/actions/bots';
import { MessageService } from '../../../services/message.service';
import { LoadMessages } from '../../../store/actions/messages';

@Component({
  selector: 'update-message',
  templateUrl: './update-message.html',
  styleUrls: ['./update-message.popup.scss']
})
export class UpdateMessagePopUp {

  constructor(
    public dialogRef: MatDialogRef<UpdateMessagePopUp>,
    public message: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: MessageFields,
    private store: Store<State>,
    ) {}

  public name = new FormControl(this.data.name, [Validators.required]);
  public message_url = new FormControl(this.data.message_url, [Validators.required]);
  public date = new FormControl(((this.data.date as unknown) as string).split('T')[0], [Validators.required]);

  get isValid() {
    return !(this.name.value && this.message_url.value && this.date.value)
  }

  create() {
    this.message.update(this.data.id as number, {
      name: this.name.value,
      message_url: this.message_url.value,
      date: new Date(this.date.value)
    }).subscribe((data)=> {
        this.store.dispatch(new LoadMessages(this.data.creater as number))
      })
    this.dialogRef.close()
  }

  close() {
    this.dialogRef.close()
  }
}
