import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, mergeMap } from 'rxjs'
import { ItemsActions, SetItems, Items } from '../actions/items';
import { ItemService } from '../../services/item.service';

@Injectable()
export class ItemsEffects {

  @Effect()
  loadArticles$ = this.actions$.pipe(
    ofType(ItemsActions.LoadItems),
    mergeMap(({ message_id }) => {
      return this.item.get(message_id).pipe(
        map(
          (items) =>
            new SetItems({
              items: items as Items[],
            })
        ),
      )
    })
  );

  constructor(
    private actions$: Actions,
    private item: ItemService
  ) {}
}
