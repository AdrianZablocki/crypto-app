import { ProviderToken, computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { MonoTypeOperatorFunction, Observable, pipe, switchMap, switchMapTo, tap, timer } from 'rxjs';
import { ICMCListResponse, ICryptoCurrency, WalletCoin } from '../models';

export interface WithWalletEntityState<Entity> {
  entities: Entity[];
  userId: string;
  wallet: WalletCoin[];
  balance: number;
  lastViewed: string[];
}

export function withWalletEntities<Entity>(
  Loader: ProviderToken<{
    getCoinsFromWallet: () => Observable<{ currencies: WalletCoin[], balance: number }>;
    getCoinsBySymbol: (coinIds: string) => Observable<{ data: { [key: string]: Entity } }>;
    getCoins: () => Observable<ICMCListResponse> 
  }>
) {
  return signalStoreFeature(
    withState<WithWalletEntityState<Entity>>({
      entities: [] as Entity[],
      userId: '',
      wallet: [] as WalletCoin[],
      balance: 0,
      lastViewed: [] as string[],
    }),
    withMethods(state => {
      const cmcService = inject(Loader);

      return {

        load: rxMethod<null>(pipe(
          switchMap(() => cmcService.getCoinsFromWallet()),
          switchMap((res) => {
            patchState(state, { wallet: res.currencies, balance: res.balance, lastViewed: res.currencies.map(c => c.code) });
            return cmcService.getCoins();
          }),
          tapResponse({
            next: ((res) => patchState(state, { entities: res.data as Entity[]})),
            error: console.error
          })
        )),

        loadEntities: rxMethod<null>(pipe(
          switchMap(() => cmcService.getCoins()),
          tapResponse({
            next: ((res) => patchState(state, { entities: res.data as Entity[]})),
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
        },

        updateLastViewed(code: string): void {
          const coins = state.lastViewed();
          coins.push(code);
     
          patchState(state, { lastViewed: [...new Set(coins)] });
        },

      }
    }),
    withComputed(state => {
      return {
        walletData: computed(() => {
          if (state.entities()?.length) {

            let coins = state.wallet().map(
              coin => state.entities().find((entity) => (entity as ICryptoCurrency).symbol === coin.code)
            );

            coins = getAmount(coins as ICryptoCurrency[], state);

            return {
              walletCoins: coins,
              ballance: state.balance(),
              lastViewed: state.lastViewed().map(
                coin => state.entities().find((entity) => (entity as ICryptoCurrency).symbol === coin)
              ),
              entities: state.entities()
            }
          }
          
          return
        })
      }
    }),
  )
}

function getAmount<Entity>(response: ICryptoCurrency[], state: any): Entity[] {
  return response.map((coin: ICryptoCurrency) => ({ 
    ...coin, 
    amount: state.wallet().find((c: WalletCoin) => c.code === coin.symbol)?.amount 
  })) as Entity[];
}

//TODO try to use
export function poll<T>(pollInterval: number): MonoTypeOperatorFunction<T> {
  return source$ => timer(0, pollInterval).pipe(switchMapTo(source$));
}
