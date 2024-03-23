import { ProviderToken, computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Observable, map, pipe, switchMap, tap } from 'rxjs';
import { ICMCListResponse, ICryptoCurrency } from '../models';

export type WalletCoin = { code: string; amount: number };

export interface WithWalletEntityState<Entity> {
  entities: Entity[];
  userId: string;
  wallet: WalletCoin[];
  crypto: ICryptoCurrency[];
}

export function withWalletEntities<Entity>(
  Loader: ProviderToken<{
    getWallet: () => Observable<{data: WalletCoin[]}>;
    getCoinsFromWallet: (coinIds: string) => Observable<{ data: { [key: string]: Entity }}>;
    getCoins: () => Observable<ICMCListResponse> 
  }>
) {
  return signalStoreFeature(
    withState<WithWalletEntityState<Entity>>({
      entities: [] as Entity[],
      userId: '',
      wallet: [] as WalletCoin[],
      crypto: [] as ICryptoCurrency[]
    }),
    withMethods(state => {
      const cmcService = inject(Loader);
      return {
        load: rxMethod<null>(pipe( // TODO add dynamic parameters to cmc
          switchMap(() => cmcService.getWallet()),
          switchMap((res) => {
            patchState(state, { wallet: res.data });
            return cmcService.getCoinsFromWallet(
              res.data.map(coin => coin.code).join(',')
            );
          }),
          map((res) => Object.keys(res.data).map(key => res.data[key])),
          tapResponse({
            next: ((res) => patchState(state, { entities: res })),
            error: console.error
          })
        )),
        loadWallet: rxMethod<WalletCoin[]>(pipe(
          switchMap((res) => cmcService.getCoinsFromWallet(res.map(coin => coin.code).join(','))),
          map((res) => Object.keys(res.data).map(key => res.data[key])),
          tapResponse({
            next: ((res) => patchState(state, { entities: res })),
            error: console.error
          })
        )),
        loadCryptoList: rxMethod<null>(pipe(
          switchMap(() => cmcService.getCoins()),
          tap(res => console.log('GET crypto list', res)),
          tapResponse({
            next: ((res) => patchState(state, { crypto: res.data })),
            error: console.error
          })
        )),
        buyCurrency(buyedCoin: WalletCoin): void {
          const coins = state.wallet();
          if (coins.find(coin => coin.code === buyedCoin.code)) {
            coins.forEach(coin => {
              if (coin.code === buyedCoin.code) {
                // return {
                  coin.amount = buyedCoin.amount + coin.amount
                // }
              }
              return coin;
            });
          } else {
            coins.push(buyedCoin);
          }

          console.log('BUY', coins)
          patchState(state, { wallet: coins });
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