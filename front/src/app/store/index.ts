import * as Bots from './reducers/bots.reducer';
import * as Messages from './reducers/messages.reducer';
import * as Items from './reducers/items.reducer';

import { ActionReducerMap, createSelector } from '@ngrx/store'
import { MessageFields, BotFields } from '../types/common';

const selectMessages = (state: State) => state.messages.messages;

export const selectMessage = createSelector(
  selectMessages,
  (messages: MessageFields[], { message_id }: { message_id: number }) => messages.filter((item) => item.id == message_id)[0]
);

const selectBots = (state: State) => state.bots.bots;

export const selectBot = createSelector(
  selectBots,
  (bots: BotFields[], { bot_id }: { bot_id: number }) => bots
);
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

