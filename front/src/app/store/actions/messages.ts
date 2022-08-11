import { Action } from '@ngrx/store';

export enum MessagesActions {
  LoadMessages = '[Messages] LoadMessages',
  SetMessages = '[Messages] SetMessages',
}

export interface Messages {
  message_url:string,
  name: string,
  date: Date,
}

export class SetMessages implements Action {
  readonly type = MessagesActions.SetMessages;
  constructor(public payload: { messages: Messages[] }) {}
}

export class LoadMessages implements Action {
  readonly type = MessagesActions.LoadMessages;
  constructor(public bot_id: number) {}

}

export type MessagesUnoin = LoadMessages | SetMessages;
