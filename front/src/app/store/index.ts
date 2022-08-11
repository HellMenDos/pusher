import * as Bots from './reducers/bots.reducer';
import * as Messages from './reducers/messages.reducer';
import * as Items from './reducers/items.reducer';

import { ActionReducerMap } from '@ngrx/store'


export interface State {
  bots: Bots.State;
  messages: Messages.State;
  items: Items.State
}

export const reducers: ActionReducerMap<State, any> = {
  bots: Bots.botsReducer,
  messages: Messages.messagesReducer,
  items: Items.ItemsReducer
};
