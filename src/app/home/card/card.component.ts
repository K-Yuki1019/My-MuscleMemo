import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as faker from 'faker/locale/ja';
import { Chart } from 'chart.js';
import { _MatRadioGroupBase } from '@angular/material/radio';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  user$ = this.authService.user$;

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
      text: faker.lorem.words(30),
    };
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
