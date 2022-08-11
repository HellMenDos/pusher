import { Component, Inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { BotService } from "src/app/services/bot.service";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BotFields } from '../../../types/common';
import { Store } from "@ngrx/store";
import { State } from "src/app/store";
import { LoadBots } from '../../../store/actions/bots';

@Component({
  selector: 'new-bot',
  templateUrl: './update-bot.html',
  styleUrls: ['./update-bot.popup.scss']
})
export class UpdateBotPopUp {

  constructor(
    public dialogRef: MatDialogRef<UpdateBotPopUp>,
    public bot: BotService,
    @Inject(MAT_DIALOG_DATA) public data: BotFields,
    private store: Store<State>,
    ) {}

  public name = new FormControl(this.data.name, [Validators.required]);
  public hash = new FormControl(this.data.hash, [Validators.required]);
  public url = new FormControl(this.data.url, [Validators.required]);
  public users_url = new FormControl(this.data.users_url, [Validators.required]);

  get isValid() {
    return !(this.name.value && this.hash.value && this.url.value && this.users_url.value)
  }

  create() {
    this.bot.update(
      this.data.id as number, {
      name: this.name.value,
      hash: this.hash.value,
      url: this.url.value,
      users_url: this.users_url.value, })
      .subscribe((data)=> {
        this.store.dispatch(new LoadBots())
      })
    this.dialogRef.close()
  }

  close() {
    this.dialogRef.close()
  }
}
