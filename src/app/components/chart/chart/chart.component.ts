import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  standalone: true
})
export class ChartComponent implements OnInit {
  @Input() data!: Observable<unknown>; // TODO add model

  ngOnInit(): void {
    this.data.subscribe(d => console.log(d))
      // console.log(this.data);
  }
}
