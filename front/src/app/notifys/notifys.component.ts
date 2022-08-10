import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { NewBotPopUp } from '../compoents/popup/new-bot/new-bot.popup';

@Component({
  selector: 'app-notifys',
  templateUrl: './notifys.component.html',
  styleUrls: ['./notifys.component.scss']
})
export class NotifysComponent  {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(NewBotPopUp, {
      width: '250px',
    });
  }

}
