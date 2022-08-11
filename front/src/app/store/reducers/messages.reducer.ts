import {
  MessagesActions,
  MessagesUnoin,
  Messages
} from '../actions/messages';

export interface State {
  messages: Messages[];
}

const initialState: State = {
  messages: [],
};

export function messagesReducer(
  state: State = initialState,
  action: MessagesUnoin
): State {
  switch (action.type) {
    case MessagesActions.SetMessages:
      return {
        ...state,
        messages: action.payload.messages,
      };
    default:
      return state;
  }
}
