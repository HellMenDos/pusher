import { Component, Inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { State } from "src/app/store";
import { ItemService } from '../../../services/item.service';
import { LoadItems } from '../../../store/actions/items';

@Component({
  selector: 'new-item',
  templateUrl: './new-item.html',
  styleUrls: ['./new-item.popup.scss']
})
export class NewItemPopUp {
  constructor(
    public dialogRef: MatDialogRef<NewItemPopUp>,
    public item: ItemService,
    @Inject(MAT_DIALOG_DATA) public data: { message_id:number },
    private store: Store<State>
    ) {}

  public fullname = new FormControl('', [Validators.required]);
  public username = new FormControl('', [Validators.required]);
  public message_id = new FormControl(0, [Validators.required]);
  public chat_id = new FormControl(0, [Validators.required]);

  get isValid() {
    return !(this.fullname.value && this.username.value && this.message_id.value && this.chat_id.value)
  }

  create() {
    this.item.create(this.data.message_id as number,{
      fullname: this.fullname.value,
      username: this.username.value,
      message_id: this.message_id.value,
      chat_id: this.chat_id.value
    }).subscribe((data)=> {
      this.store.dispatch(new LoadItems(this.data.message_id))
    })
    this.dialogRef.close()

  }

  close() {
    this.dialogRef.close()
  }
}
