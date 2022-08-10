import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifysComponent } from './notifys.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { NewBotPopUp } from 'src/app/compoents/popup/new-bot/new-bot.popup';


const routes: Routes = [
  {
    path: '',
    component: NotifysComponent,
  },
];

@NgModule({
  declarations: [
    NotifysComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class NotifysModule { }
