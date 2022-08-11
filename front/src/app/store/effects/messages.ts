import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, mergeMap } from 'rxjs'
import { MessagesActions, SetMessages, Messages } from '../actions/messages';
import { MessageService } from '../../services/message.service';

@Injectable()
export class MessagesEffects {

  @Effect()
  loadArticles$ = this.actions$.pipe(
    ofType(MessagesActions.LoadMessages),
    mergeMap(({ bot_id }) => {
      return this.messages.get(bot_id).pipe(
        map(
          (messages) =>
            new SetMessages({
              messages: messages as Messages[],
            })
        ),
      )
    })
  );

  constructor(
    private actions$: Actions,
    private messages: MessageService
  ) {}
}
