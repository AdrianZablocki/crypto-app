import { ICryptoCurrency } from './crypto-currency.model';

export interface ICMCResponse {
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
