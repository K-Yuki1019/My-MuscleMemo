import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, AfterViewInit {
  ctx = 'myChart';
  myChart: Chart;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: [
          '1日',
          '2日',
          '3日',
          '4日',
          '5日',
          '6日',
          '7日',
          '8日',
          '9日',
          '10日',
          '11日',
          '12日',
          '13日',
          '14日',
          '15日',
          '16日',
          '17日',
          '18日',
          '19日',
          '20日',
          '21日',
          '22日',
          '23日',
          '24日',
          '25日',
          '26日',
          '27日',
          '28日',
          '29日',
          '30日',
        ],
        datasets: [
          {
            type: 'line',
            label: '体脂肪率',
            backgroundColor: '#ABB5F2',
            data: [
              22,
              21,
              23,
              22,
              21,
              20,
              21,
              23,
              21,
              20,
              19,
              19,
              20,
              18,
              17,
              17,
              16,
              15,
              16,
              13,
              15,
              14,
              13,
              13,
              13,
              12,
              12,
              11,
              10,
              12,
            ],
            borderColor: '#ABB5F2',
            borderWidth: 1,
          },
          {
            type: 'bar',
            label: '体重',
            backgroundColor: '#BCE6E5',
            data: [
              59,
              60,
              60,
              61,
              62,
              61,
              61,
              60,
              58,
              57,
              58,
              57,
              56,
              55,
              57,
              56,
              55,
              54,
              53,
              53,
              52,
              54,
              55,
              53,
              52,
              52,
              51,
              54,
              53,
              51,
            ],
            borderColor: 'rgb(189,230,229)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: '7月の体重/ 体脂肪率',
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Month',
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Value',
              },
            },
          ],
        },
        maintainAspectRatio: false,
      },
    });
  }
}
