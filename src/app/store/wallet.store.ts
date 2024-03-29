import { patchState, signalStore, withHooks } from '@ngrx/signals';

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

        if (wallet) {
          store.loadWallet(wallet);
        }

        if (lastViewed) {
          patchState(store,  { lastViewed });
        }
        return;
      }
      store.load(null);
    }
  })
)