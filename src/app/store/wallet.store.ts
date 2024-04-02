import { patchState, signalStore, withHooks } from '@ngrx/signals';
import { interval, tap } from 'rxjs';

import { CmcService } from 'src/app/services';
import { withWalletEntities } from './with-wallet-entities';
import { withLocalStorageSync } from './with-local-storage';

export const WalletStore = signalStore(
  { providedIn: 'root' },
  withWalletEntities(CmcService),
  withLocalStorageSync('wallet'),
  withHooks({
    onInit(store): void {
      if(store.loadFromLocalStorage()) {
        const wallet = JSON.parse(localStorage.getItem('wallet') || '').wallet;
        const lastViewed = JSON.parse(localStorage.getItem('wallet') || '').lastViewed;

        pollingEntities(store); //TODO try to use rxjs MonoTypeOperatorFunction

        if (wallet && lastViewed) {
          patchState(store,  { wallet, lastViewed });
        }
        return;
      }
      store.load(null);

      pollingEntities(store);
    }
  })
)

export function pollingEntities(store: any): void {
  interval(10000).pipe(
    tap(() => store.loadEntities(null))
  ).subscribe();
}
