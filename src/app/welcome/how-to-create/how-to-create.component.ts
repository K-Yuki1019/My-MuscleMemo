import { Component, OnInit } from '@angular/core';
import * as faker from 'faker/locale/ja';
@Component({
  selector: 'app-how-to-create',
  templateUrl: './how-to-create.component.html',
  styleUrls: ['./how-to-create.component.scss'],
})
export class HowToCreateComponent implements OnInit {
  fakeForWelcome$ = new Array(1).fill(null).map(() => {
    return {
      image: faker.image.sports(),
    };
  });

  constructor() {}

  ngOnInit(): void {}
}
