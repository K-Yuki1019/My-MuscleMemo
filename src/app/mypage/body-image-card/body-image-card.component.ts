import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import * as faker from 'faker/locale/ja';

@Component({
  selector: 'app-body-image-card',
  templateUrl: './body-image-card.component.html',
  styleUrls: ['./body-image-card.component.scss'],
})
export class BodyImageCardComponent implements OnInit {
  users = new Array(100).fill(null).map(() => {
    return {
      uid: faker.random.uuid(),
      userName: faker.name.findName(),
      avatarUrl: faker.image.image(),
      height: faker.random.objectElement([160, 170, 180, 199]),
      weight: faker.random.objectElement([40, 50, 60, 72]),
      gender: faker.name.gender(['man', 'woman', 'other']),
    };
  });

  constructor() {}

  ngOnInit(): void {}
}
