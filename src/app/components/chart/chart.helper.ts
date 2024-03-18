import { ChartConfiguration, ChartOptions } from "chart.js";
import { IChartRangeButton } from 'src/app/models';

export class ChartHelper {

  static get plugins(): any[] {
    return [
      {
        id: 'chart',
        beforeEvent(chart: any, args: any, pluginOptions: any) {
          const { height } = chart.chartArea;
          const { x } = args.event;
          const ctx = chart.ctx;

          // Set line opts
          ctx.save();

          ctx.lineWidth = 1;
          ctx.setLineDash([0, 0]);
          ctx.strokeStyle = '#FFF';

          // draw vertical line      
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();

          ctx.restore();
        }
  
      }
    ];
  }

  static get options(): ChartOptions<'line'> {
    return {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: {
          display: false,
          grid: {
            display: false,
          }
        },
        y: {
          display: false,
          grid: {
            display: false
          }
        },
      },
      events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        },
      },
      interaction: {
        intersect: false
      },
      elements: {
        point: {
          radius: 0,
          borderWidth: 0,
          hoverRadius: 0,
        }
      }
    };
  }

  static getConfiguration(percentageChange?: number): ChartConfiguration<'line'>['data']  {
    return {
      labels: [],
      datasets: [
        {
          data: [],
          borderColor: percentageChange && percentageChange < 0 ? '#EE4A59' : '#1AC097',
          borderWidth: 1,
          pointRadius: 0
        }
      ]
    };
  }

  static get buttonsConfig(): IChartRangeButton[] {
    return [
      { label: 'Day', value: 'day'},
      { label: 'Week', value: 'week'},
      { label: 'Month', value: 'month'},
      { label: 'Year', value: 'year'},
      { label: 'All', value: 'all'}
    ]
  }

}