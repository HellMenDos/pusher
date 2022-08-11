import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { TokenInterceptor } from './token.interceptor';
import { StoreModule } from '@ngrx/store'
import { reducers } from './store/index';
import { EffectsModule } from '@ngrx/effects';
import { BotsEffects } from './store/effects/bots';
import { MessagesEffects } from './store/effects/messages';
import { ItemsEffects } from './store/effects/items';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([BotsEffects, MessagesEffects, ItemsEffects])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
