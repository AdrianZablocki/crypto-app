export interface IWalletState {
  userId: string;
  portfolio: any;
}

export const initialState: IWalletState = {
  userId: 'test!@#$%',
  portfolio: []
}
