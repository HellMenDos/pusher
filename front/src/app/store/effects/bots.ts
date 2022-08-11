import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, mergeMap } from 'rxjs'
import { BotsActions, SetBots, Bots } from '../actions/bots';
import { BotService } from '../../services/bot.service';

@Injectable()
export class BotsEffects {

  @Effect()
  loadArticles$ = this.actions$.pipe(
    ofType(BotsActions.LoadBots),
    mergeMap(() => this.bot.get().pipe(
        map(
          (bots) =>
            new SetBots({
              bots: bots as Bots[],
            })
        ),
      )
    )
  );

  constructor(
    private actions$: Actions,
    private bot: BotService
  ) {}
}
