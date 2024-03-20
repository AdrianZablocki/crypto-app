import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { env } from 'env';
import { ICMCResponse } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class CmcService {
  CMCheaders = new HttpHeaders()
      .set('X-CMC_PRO_API_KEY', env.API_KEY)
      .set('Accept', 'application/json');

  constructor(private http: HttpClient) { }

  getCoins(): Observable<ICMCResponse> {
    const params = new HttpParams()
      .set('start', '1')
      .set('limit', '50')
      .set('convert', 'USD');

    return this.http.get<ICMCResponse>('http://localhost:5000/v1/cryptocurrency/listings/latest', { headers: this.CMCheaders, params });
  }
  getCoinsFromWallet(query: string): Observable<any> {
    console.log('query', query)
    const params = new HttpParams()
      .set('symbol', query);
    return this.http.get<any>('http://localhost:5000/v1/cryptocurrency/quotes/latest', { headers: this.CMCheaders, params });
  }

  getIconUrl(id: number): string {
    return `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`;
  }

  getWallet(): Observable<{coinIds: number[]}> {
    const params = new HttpParams()
      .set('id', 1)

    return this.http.get<{coinIds: number[]}>(`http://localhost:5000/wallet`, { params });
  }

}
