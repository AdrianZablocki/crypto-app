import { ChartConfiguration, ChartOptions } from "chart.js";

export class ChartHelper {

  static get plugins(): any[] {
    return [
      {
        id: 'chart',
        beforeEvent(chart: any, args: any, pluginOptions: any) {
            const { type, x, y } = args.event;
            const ctx = chart.ctx;
            const { height, left, right, bottom } = chart.chartArea;
  
            console.log(chart, args, chart.tooltip._active)
            // Set line opts
            ctx.save();
  
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 3]);
            ctx.strokeStyle = '#FF4949';
  
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
      responsive: false,
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
  
      },
      interaction: {
        intersect: false
      },
    };
  }

  static get configuration(): ChartConfiguration<'line'>['data']  {
    return {
      labels: [],
      datasets: [
        {
          data: [],
          label: 'Series A',
          fill: true,
          tension: 0.5,
          borderColor: 'white',
          backgroundColor: 'transparent',
          pointRadius: 0
        }
      ]
    };
  }

}