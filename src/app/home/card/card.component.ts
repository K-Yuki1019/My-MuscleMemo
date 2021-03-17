import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as faker from 'faker/locale/ja';
import { Chart } from 'chart.js';
import { _MatRadioGroupBase } from '@angular/material/radio';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, AfterViewInit {
  fakeNoteWithUser$ = new Array(100).fill(null).map(() => {
    return {
      createdAt: faker.date.month(),
      weight: faker.random.number({ min: 40, max: 100 }),
      bodyFatPer: faker.random.number({ min: 4, max: 30 }),
      todayMenu: faker.random.word({ min: 3, max: 12 }),
      userName: faker.name.findName(),
      avatarUrl: faker.image.image(),
      likedCount: faker.random.number(50),
      bodyImageUrl: faker.random.image(),
    };
  });

  ctx = 'myChart';
  myChart: Chart;

  ngAfterViewInit() {
    this.myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月',
        ],
        datasets: [
          {
            label: '体重',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            data: [59, 60, 73, 52, 49, 50, 59, 60, 73, 52, 49, 50],
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
          {
            label: '体脂肪率',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            data: [13, 13, 17, 13, 15, 14, 14, 15, 17, 14, 15, 13],
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Chart.js Line Chart',
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
      },
    });
  }

  constructor() {}

  ngOnInit(): void {}
}
