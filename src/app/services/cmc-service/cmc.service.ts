import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { env } from 'env';
import { ICMCListResponse, ICMCWalletListResponse, IWallet } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class CmcService {
  private CMCheaders = new HttpHeaders()
      .set('X-CMC_PRO_API_KEY', env.API_KEY)
      .set('Accept', 'application/json');
  private cmcBaseUrl = 'http://localhost:5000/v1/cryptocurrency/';
  
  constructor(private http: HttpClient) { }

  getCoins(): Observable<ICMCListResponse> {
    const params = new HttpParams()
      .set('start', '1')
      .set('limit', '100')
      .set('convert', 'USD');

    return this.http.get<ICMCListResponse>(`${this.cmcBaseUrl}listings/latest`, { headers: this.CMCheaders, params });
  }
  getCoinsBySymbol(query: string): Observable<ICMCWalletListResponse> {
    const params = new HttpParams()
      .set('symbol', query);

    return this.http.get<ICMCWalletListResponse>(`${this.cmcBaseUrl}quotes/latest`, { headers: this.CMCheaders, params });
  }

  getCoinIcon(id: number): string {
    return `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`;
  }

  getCoinsFromWallet(): Observable<IWallet> {
    const params = new HttpParams()
      .set('id', 1);

    return this.http.get<IWallet>(`http://localhost:5000/wallet`, { params });
  }

}
