import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { map, pipe, switchMap } from 'rxjs';
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
      load: rxMethod<string | null>(pipe( // TODO add dynamic parameters to cmc
        switchMap(() => cmcService.getWallet()),
        switchMap((res) => cmcService.getCoinsFromWallet(res.coinIds.join(','))),
        map((res) => Object.keys(res.data).map(key => res.data[key])),
        tapResponse({
          next: ((res) => patchState(state, { portfolio: res })),
          error: console.error
        })
      ))
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
      store.load(null)
    }
  })
)