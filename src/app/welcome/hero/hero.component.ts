import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as faker from 'faker/locale/ja';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  fakeForWelcome$ = new Array(1).fill(null).map(() => {
    return {
      image: faker.image.sports(),
    };
  });

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login();
    this.router.navigateByUrl('');
  }

  ngOnInit(): void {}
}
