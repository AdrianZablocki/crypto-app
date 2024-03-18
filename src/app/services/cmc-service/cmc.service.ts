import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { env } from 'env';
import { ICMCResponse } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class CmcService {

  constructor(private http: HttpClient) { }

  getCoins(): Observable<ICMCResponse> {
    const headers = new HttpHeaders()
      .set('X-CMC_PRO_API_KEY', env.API_KEY)
      .set('Accept', 'application/json');
    const params = new HttpParams()
      .set('start', '1')
      .set('limit', '50')
      .set('convert', 'USD');

    return this.http.get<ICMCResponse>('http://localhost:5000/v1/cryptocurrency/listings/latest', { headers, params });
  }

  getIconUrl(id: number): string {
    return `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`;
  }

}
