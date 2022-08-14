import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NewBotPopUp } from '../compoents/popup/new-bot/new-bot.popup';
import { State } from '../store';
import { LoadBots, Bots } from '../store/actions/bots';
import { BotService } from '../services/bot.service';
import { UpdateBotPopUp } from '../compoents/popup/update-bot/update-bot.popup';
import { BotFields } from '../types/common';



@Component({
  selector: 'app-notifys',
  templateUrl: './notifys.component.html',
  styleUrls: ['./notifys.component.scss']
})
export class NotifysComponent implements OnInit  {

  public bots: Observable<Bots[]> = this.store.select((state) => state.bots.bots)
  displayedColumns: string[] = ['name','hash','url','users_url','update','delete','link'];



  constructor(
    public dialog: MatDialog,
    private store: Store<State>,
    private bot: BotService
    ) {}


  ngOnInit() {
    this.store.dispatch(new LoadBots())
  }

  openDialog(): void {
    this.dialog.open(NewBotPopUp, {
      width: '550px',
    });
  }

  delete(id: number) {
    this.bot.delete(id).subscribe((data) => {
      this.store.dispatch(new LoadBots())
    })
  }

  updateDialog(data: BotFields): void {
    this.dialog.open(UpdateBotPopUp, {
      data: data,
      width: '550px',
    });
  }

}
