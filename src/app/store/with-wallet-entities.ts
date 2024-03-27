import { ProviderToken, computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Observable, map, pipe, switchMap } from 'rxjs';
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
    getWallet: () => Observable<{ data: WalletCoin[] }>;
    getCoinsFromWallet: (coinIds: string) => Observable<{ data: { [key: string]: Entity } }>;
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
        buyCurrency(buyedCoin: WalletCoin): void {
          const coins = state.wallet();
          if (coins.find(coin => coin.code === buyedCoin.code)) {
            coins.forEach(coin => {
              if (coin.code === buyedCoin.code) {
                coin.amount = buyedCoin.amount + coin.amount;
              }
              return coin;
            });
          } else {
            coins.push(buyedCoin);
          }
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

function getAmount<Entity>(response: { data: { [key: string]: Entity }}, state: any): Entity[] {
  return Object.keys(response.data).map(key => ({ 
    ...response.data[key], 
    amount: state.wallet().find((c: WalletCoin) => c.code === key)?.amount 
  }));
}