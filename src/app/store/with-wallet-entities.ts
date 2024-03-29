import { ProviderToken, computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Observable, map, pipe, switchMap } from 'rxjs';
import { ICMCListResponse, ICryptoCurrency, WalletCoin } from '../models';

export interface WithWalletEntityState<Entity> {
  entities: Entity[];
  userId: string;
  wallet: WalletCoin[];
  balance: number;
  crypto: ICryptoCurrency[]; // TODO move to cryptocurrencies store
}

export function withWalletEntities<Entity>(
  Loader: ProviderToken<{
    getWallet: () => Observable<{ currencies: WalletCoin[], balance: number }>;
    getCoinsFromWallet: (coinIds: string) => Observable<{ data: { [key: string]: Entity } }>;
    getCoins: () => Observable<ICMCListResponse> 
  }>
) {
  return signalStoreFeature(
    withState<WithWalletEntityState<Entity>>({
      entities: [] as Entity[],
      userId: '',
      wallet: [] as WalletCoin[],
      balance: 0,
      crypto: [] as ICryptoCurrency[]
    }),
    withMethods(state => {
      const cmcService = inject(Loader);

      return {

        load: rxMethod<null>(pipe( // TODO add dynamic parameters to cmc
          switchMap(() => cmcService.getWallet()),
          switchMap((res) => {
            patchState(state, { wallet: res.currencies, balance: res.balance });
            return cmcService.getCoinsFromWallet(
              res.currencies.map(coin => coin.code).join(',')
            );
          }),
          map((res) => getAmount(res, state)),
          tapResponse({
            next: ((res) => patchState(state, { entities: res as Entity[] })),
            error: console.error
          })
        )),

        loadWallet: rxMethod<WalletCoin[]>(pipe(
          switchMap((res) => cmcService.getCoinsFromWallet(res.map(coin => coin.code).join(','))),
          map((res) => getAmount(res, state)),
          tapResponse({
            next: ((res) => patchState(state, { entities: res as Entity[] })),
            error: console.error
          })
        )),

        loadCryptoList: rxMethod<null>(pipe(
          switchMap(() => cmcService.getCoins()),
          tapResponse({
            next: ((res) => patchState(state, { crypto: res.data })),
            error: console.error
          })
        )),

        tradeOnCrypto(coin: WalletCoin, side: 'buy' | 'sell'): void {
          const coins = state.wallet();
          const coinToUpdate = coins.find(c => c.code === coin.code);

          coinToUpdate
            ? (coinToUpdate.amount = side === 'buy' ? +coin.amount + +coinToUpdate.amount : +coinToUpdate.amount - +coin.amount)
            : coins.push(coin);

          patchState(state, { wallet: coins });
        },

        updateBalance(newBalance: number): void {
          patchState(state, { balance: newBalance });
        }
      }
    }),
    withComputed(state => {
      return {
        selectedCoin: computed(() => {
          const coinId = 1;

          return {
            coins: state.entities().length ? state.entities().filter((coin: any) => coin.id === coinId) : [],
            userId: state.userId()
          }
        })
      }
    }),
  )
}

function getAmount<Entity>(response: { data: { [key: string]: Entity }}, state: any): Entity[] {
  return Object.keys(response.data).map(key => ({ 
    ...response.data[key], 
    amount: state.wallet().find((c: WalletCoin) => c.code === key)?.amount 
  }));
}
