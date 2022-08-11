import { LoadBots } from './../../../store/actions/bots';
import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { BotService } from "src/app/services/bot.service";
import { State } from "src/app/store";

@Component({
  selector: 'new-bot',
  templateUrl: './new-bot.html',
  styleUrls: ['./new-bot.popup.scss']
})
export class NewBotPopUp {
  constructor(
    public dialogRef: MatDialogRef<NewBotPopUp>,
    public bot: BotService,
    private store: Store<State>) {}

  public name = new FormControl('', [Validators.required]);
  public hash = new FormControl('', [Validators.required]);
  public url = new FormControl('', [Validators.required]);
  public users_url = new FormControl('', [Validators.required]);

  get isValid() {
    return !(this.name.value && this.hash.value && this.url.value && this.users_url.value)
  }

  create() {
    this.bot.create({
      name: this.name.value,
      hash: this.hash.value,
      url: this.url.value,
      users_url: this.users_url.value,
    }).subscribe((data)=>{
      this.store.dispatch(new LoadBots())
    })
    this.dialogRef.close()
  }

  close() {
    this.dialogRef.close()
  }
}
