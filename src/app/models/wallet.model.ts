export type WalletCoin = { code: string; amount: number };

export interface IWallet {
  currencies: WalletCoin[];
  balance: number;
}
