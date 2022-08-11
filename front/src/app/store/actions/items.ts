import { Action } from '@ngrx/store';

export enum ItemsActions {
  LoadItems = '[Items] LoadItems',
  SetItems = '[Items] SetItems',
}

export interface Items {
  id?: number,
  creater?: number,
  fullname:string,
  username: string,
  message_id: number,
  chat_id: number
}

export class SetItems implements Action {
  readonly type = ItemsActions.SetItems;
  constructor(public payload: { items: Items[] }) {}
}

export class LoadItems implements Action {
  readonly type = ItemsActions.LoadItems;
  constructor(public message_id: number) {}
}

export type ItemsUnoin = LoadItems | SetItems;
