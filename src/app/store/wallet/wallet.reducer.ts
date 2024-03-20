export interface IWalletState {
  userId: string;
  portfolio: any | null;
  coinsIds: number[] | null;
}

export const initialState: IWalletState = {
  userId: 'test!@#$%',
  portfolio: [],
  coinsIds: null
}
