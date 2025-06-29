import { Chart } from 'chart.js/auto';
import { chartData } from '../data/index.js';

export class ChartManager {
  constructor(canvasId) {
    this.ctx = document.getElementById(canvasId);
    this.chart = null;
    this.initChart();
  }

  initChart() {
    const data = {
      labels: chartData,
      datasets: [{
        label: 'mt.',
        data: chartData,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192,.6)',
        tension: 0.1
      }]
    };

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            enabled: false,
            mode: 'index',
            intersect: false,
            external: this.customTooltip.bind(this)
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    };

    this.chart = new Chart(this.ctx, config);
  }

  customTooltip(context) {
    let tooltipEl = document.getElementById('chartjs-tooltip');

    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.id = 'chartjs-tooltip';
      tooltipEl.style.opacity = 0;
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
      tooltipEl.style.borderRadius = '3px';
      tooltipEl.style.color = 'white';
      tooltipEl.style.pointerEvents = 'none';
      tooltipEl.style.transition = 'opacity 0.3s ease';

      const table = document.createElement('table');
      table.style.margin = '0px';
      tooltipEl.appendChild(table);
      document.body.appendChild(tooltipEl);
    }

    const tooltipModel = context.tooltip;
    if (tooltipModel.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    if (tooltipModel.body) {
      const bodyLines = tooltipModel.body.map(item => item.lines);
      let innerHtml = '<thead>';

      tooltipModel.title.forEach(title => {
        innerHtml += '<tr><th>' + title + '</th></tr>';
      });
      innerHtml += '</thead><tbody>';

      bodyLines.forEach(body => {
        innerHtml += '<tr><td>' + body + '</td></tr>';
      });
      innerHtml += '</tbody>';

      const tableRoot = tooltipEl.querySelector('table');
      tableRoot.innerHTML = innerHtml;
    }

    const position = context.chart.canvas.getBoundingClientRect();
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = position.left + window.scrollX + tooltipModel.caretX + 'px';
    tooltipEl.style.top = position.top + window.scrollY + tooltipModel.caretY + 'px';
    tooltipEl.style.fontFamily = tooltipModel.options.bodyFont.family;
    tooltipEl.style.fontSize = tooltipModel.options.bodyFont.size + 'px';
    tooltipEl.style.fontStyle = tooltipModel.options.bodyFont.style;
    tooltipEl.style.padding = tooltipModel.options.padding + 'px ' + tooltipModel.options.padding + 'px';
  }

  updateTooltip(time, maxTime) {
    if (maxTime === 0) return;
    
    var segmentCount = chartData.length - 1;
    var segmentTime = maxTime / segmentCount;
    var segmentIndex = Math.floor(time / segmentTime);
    
    this.chart.tooltip.setActiveElements([{
      datasetIndex: 0, 
      index: segmentIndex
    }], { 
      x: segmentIndex, 
      y: chartData[segmentIndex] 
    });
    
    this.chart.update();
  }

  getChart() {
    return this.chart;
  }
}
