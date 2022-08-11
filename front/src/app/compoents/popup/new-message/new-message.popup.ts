import { Component, Inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MessageService } from '../../../services/message.service';
import { Store } from "@ngrx/store";
import { State } from "src/app/store";
import { LoadMessages } from '../../../store/actions/messages';

@Component({
  selector: 'new-message',
  templateUrl: './new-message.html',
  styleUrls: ['./new-message.popup.scss']
})
export class NewMessagePopUp {
  constructor(
    public dialogRef: MatDialogRef<NewMessagePopUp>,
    public message: MessageService,
    private store: Store<State>,
    @Inject(MAT_DIALOG_DATA) public data: { bot_id:number },
    ) {}

  public name = new FormControl('', [Validators.required]);
  public date = new FormControl('', [Validators.required]);
  public message_url = new FormControl('', [Validators.required]);

  get isValid() {
    return !(this.name.value && this.date.value && this.message_url.value)
  }

  create() {
    this.message.create(this.data.bot_id, {
      name: this.name.value,
      message_url: this.message_url.value,
      date: new Date(this.date.value)
    }).subscribe((data)=> {
      this.store.dispatch(new LoadMessages(this.data.bot_id))
    })
    this.dialogRef.close()
  }

  close() {
    this.dialogRef.close()
  }
}
