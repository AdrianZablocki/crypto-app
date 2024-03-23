import { signalStore, withHooks } from '@ngrx/signals';

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
        wallet ? store.loadWallet(wallet) : null;
        return;
      }
      store.load(null);
    }
  })
)