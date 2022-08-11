import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifysComponent } from './notifys.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../token.interceptor';
import { BotService } from '../services/bot.service';
import { NewBotPopUp } from '../compoents/popup/new-bot/new-bot.popup';
import { ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { UpdateBotPopUp } from '../compoents/popup/update-bot/update-bot.popup';
import { MessagesComponent } from './messages/messages.component';
import { NewMessagePopUp } from '../compoents/popup/new-message/new-message.popup';
import { UpdateMessagePopUp } from '../compoents/popup/update-message/update-message.popup';
import { ItemsComponent } from './items/items.component';
import { NewItemPopUp } from '../compoents/popup/new-item/new-item.popup';

const routes: Routes = [
  {
    path: '',
    component: NotifysComponent,
  },
  {
    path: 'messages/:id',
    component: MessagesComponent,
  },
  {
    path: 'items/:id',
    component: ItemsComponent
  }
];

@NgModule({
  declarations: [
    NotifysComponent,
    MessagesComponent,
    NewBotPopUp,
    UpdateBotPopUp,
    NewMessagePopUp,
    UpdateMessagePopUp,
    NewItemPopUp,
    MessagesComponent,
    ItemsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule
  ],
  providers: [
    BotService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ]
})
export class NotifysModule { }
