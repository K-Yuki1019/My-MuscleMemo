import { Component, OnInit } from '@angular/core';
import * as faker from 'faker/locale/ja';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  fakeNoteWithUser$ = new Array(100).fill(null).map(() => {
    return {
      createdAt: faker.date.month(),
      weight: faker.random.number({ min: 40, max: 100 }),
      bodyFatPer: faker.random.number({ min: 4, max: 30 }),
      todayMenu: faker.lorem.word(2),
      userName: faker.name.findName(),
      avatarUrl: faker.image.image(),
      likedCount: faker.random.number(50),
    };
  });

  constructor() {}

  ngOnInit(): void {}
}
