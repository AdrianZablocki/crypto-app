import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

import { ICryptoCurrency } from 'src/app/models';
import { ChartService } from 'src/app/services';
import { ChartHelper } from './chart.helper';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  standalone: true,
  imports: [
    BaseChartDirective
  ]
})
export class ChartComponent implements AfterViewInit {
  @Input() data!: ICryptoCurrency; // TODO add model
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartData = ChartHelper.configuration;
  public lineChartOptions = ChartHelper.options;
  public lineChartLegend = true;
  public plugins = ChartHelper.plugins;

  constructor(private chartService: ChartService) {}

  ngAfterViewInit(): void {
    this.chartService.getChartData().subscribe(res=> {
      this.lineChartData.labels = res.labels;
      this.lineChartData.datasets[0].data = res.data;
      this.chart?.chart?.update()
    });
  }

}
