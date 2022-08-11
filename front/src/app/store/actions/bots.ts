import { Action } from '@ngrx/store';

export enum BotsActions {
  LoadBots = '[Bots] LoadBots',
  SetBots = '[Bots] SetBots',
}

export interface Bots {
  name:string,
  url: string,
  users_url: string,
  hash: string
}

export class SetBots implements Action {
  readonly type = BotsActions.SetBots;
  constructor(public payload: { bots: Bots[] }) {}
}

export class LoadBots implements Action {
  readonly type = BotsActions.LoadBots;
}

export type BotsUnoin = LoadBots | SetBots;
