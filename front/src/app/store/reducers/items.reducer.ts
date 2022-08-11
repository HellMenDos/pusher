import {
  ItemsActions,
  ItemsUnoin,
  Items
} from '../actions/items';

export interface State {
  items: Items[];
}

const initialState: State = {
  items: [],
};

export function ItemsReducer(
  state: State = initialState,
  action: ItemsUnoin
): State {
  switch (action.type) {
    case ItemsActions.SetItems:
      return {
        ...state,
        items: action.payload.items,
      };
    default:
      return state;
  }
}
