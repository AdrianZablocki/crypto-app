import { ICryptoCurrency } from './crypto-currency.model';

export interface ICMCListResponse {
  data: ICryptoCurrency[];
  status: ICMCResponseStatus;
}

export interface ICMCResponseStatus {
  timestamp: string;
  error_code: number;
  error_message: string;
  elapsed: number;
  credit_count: number;
  notice: string;
  total_count: number;
}


export interface ICMCWalletListResponse {
  data: {
    [key: string]: ICryptoCurrency;
  };
  status: ICMCResponseStatus;
}
