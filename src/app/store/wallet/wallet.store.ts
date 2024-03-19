import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

import { initialState } from './wallet.reducer';
import { CmcService } from 'src/app/services';
import { ICMCResponse } from 'src/app/models';

export const WalletStore = signalStore(
  { providedIn: 'root' }, 
  withState(initialState),
  withMethods(state => {
    const cmcService = inject(CmcService);
    return {
      load: rxMethod<string>( // TODO add dynamic parameters to cmc
        pipe(
          switchMap(() => cmcService.getCoins()),
          tapResponse({
            next: ((res: ICMCResponse) => patchState(state, { portfolio: res.data})),
            error: console.error
          })
        )
      )
    }
  }),
  withComputed(state => {
    return {
      selectedCoin: computed(() => {
        const coinId = 1;

        return {
          coins : state.portfolio().length ? state.portfolio().filter((coin: any) => coin.id ===  coinId) : [],
          userId: state.userId()
        }
      })
    }
  }),
  withHooks({
    onInit(store): void {
      store.load('')
    }
  })
)