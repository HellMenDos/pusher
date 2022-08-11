import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { NewBotPopUp } from '../compoents/popup/new-bot/new-bot.popup';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'reg',
    component: RegistrationComponent
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
