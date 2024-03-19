import { AfterViewInit, Component, Input, OnInit, ViewChild, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/angular/standalone";
import { BaseChartDirective } from 'ng2-charts';

import { ICryptoCurrency } from 'src/app/models';
import { ChartService } from 'src/app/services';
import { ChartHelper } from './chart.helper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  standalone: true,
  imports: [
    BaseChartDirective, 
    CommonModule,
    FormsModule,
    IonLabel,
    IonSegmentButton,
    IonSegment
  ]
})
export class ChartComponent implements OnInit, AfterViewInit {
  @Input() data!: ICryptoCurrency; // TODO add model
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  buttonsConfig = ChartHelper.buttonsConfig;
  lineChartData = ChartHelper.getConfiguration();
  lineChartOptions = ChartHelper.options;
  plugins = ChartHelper.plugins;
  price = signal<number>(0);
  timestamp = signal<string>('');
  selectedRange = signal<string>('');

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.lineChartData = ChartHelper.getConfiguration(this.data.quote.USD.percent_change_24h);
    this.price.set(this.data.quote.USD.price);
    this.timestamp.set(this.data.quote.USD.last_updated);
  }

  ngAfterViewInit(): void {
    this.getChartData();
    this.updatePriceOnHover();
  }

  getChartData(range: string = 'day'): void {
    this.chartService.getChartData(this.data.id, range).subscribe(res => {
      this.lineChartData.labels = res.labels;
      this.lineChartData.datasets[0].data = res.data;
      this.selectedRange.set(range);
      this.chart?.chart?.update();
    });
  }

  segmentChanged(event: CustomEvent | Event): void {
    this.selectedRange.set((event as CustomEvent).detail.value);
  }

  private updatePriceOnHover(): void {
    this.chart?.chartHover.subscribe(e => {
      const index = e.active[0] as {index: number}
      this.price.set(this.lineChartData.datasets[0].data[index.index] as number);
      this.timestamp.set(this.lineChartData.labels?.[index.index] as string);
    });
  }

}
