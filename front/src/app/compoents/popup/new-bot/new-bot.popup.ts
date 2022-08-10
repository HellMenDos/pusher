import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'new-bot',
  templateUrl: './new-bot.html',
})
export class NewBotPopUp {
  constructor(public dialogRef: MatDialogRef<NewBotPopUp>) {}
}
