import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { IChartData, IChartDataResponse } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) { }

  getChartData(): Observable<IChartData> {
    return this.http.get<IChartDataResponse>('http://localhost:5000/chart-data').pipe(
      map((res) => {
        const labels = Object.keys(res.data.points);
        const data = labels.map((label) => res.data.points[label].v[1]);
        return { labels, data };
      })
    );
  }
}
