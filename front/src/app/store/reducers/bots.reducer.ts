import {
  BotsActions,
  BotsUnoin,
  Bots
} from '../actions/bots';

export interface State {
  bots: Bots[];
}

const initialState: State = {
  bots: [],
};

export function botsReducer(
  state: State = initialState,
  action: BotsUnoin
): State {
  switch (action.type) {
    case BotsActions.SetBots:
      return {
        ...state,
        bots: action.payload.bots,
      };
    default:
      return state;
  }
}
